import { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { listarPedidos, atualizarStatusPedido } from '../api/pedidos';
import type { PedidoResponse } from '../types';
import { Truck, AlertCircle, Check, MapPin } from 'lucide-react';

export function EntregadorPedidos() {
  const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarPedidos = async () => {
    try {
      const todos = await listarPedidos();
      setPedidos(todos.filter((p) => p.status === 'em_preparo' || p.status === 'em_andamento'));
    } catch {
      setError('Erro ao carregar pedidos');
    }
  };

  const avancar = async (id: number, status: string) => {
    setLoading(true);
    setError('');
    try {
      await atualizarStatusPedido(id, status);
      await carregarPedidos();
    } catch {
      setError('Erro ao atualizar status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarPedidos(); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  const statusLabel: Record<string, string> = {
    em_preparo: 'Em preparo',
    em_andamento: 'Em andamento',
  };

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />

      <div className="pt-20 px-4 md:px-6 pb-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Truck className="w-5 md:w-6 h-5 md:h-6 text-[#3C5A1A]" />
          <h1 className="text-xl md:text-2xl font-bold text-[#3C5A1A]">Entregas</h1>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {pedidos.length === 0 ? (
          <div className="text-center py-16 text-[#8FA86A]">
            <Truck className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">Nenhuma entrega pendente</p>
            <p className="text-sm mt-1">Todos os pedidos foram entregues!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-xl shadow-md border border-[#D8D4C5] p-4 md:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#8FA86A] font-mono text-xs">#{pedido.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${pedido.status === 'em_andamento' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {statusLabel[pedido.status] || pedido.status}
                      </span>
                    </div>
                    <div className="flex items-start gap-1 text-sm text-[#5B5B3A] break-words">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{pedido.enderecoEntrega}</span>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 sm:ml-4">
                    {pedido.status === 'em_preparo' && (
                      <button
                        onClick={() => avancar(pedido.id, 'em_andamento')}
                        disabled={loading}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium cursor-pointer disabled:opacity-50 whitespace-nowrap"
                      >
                        <Truck className="w-4 h-4" />
                        Em Andamento
                      </button>
                    )}
                    {pedido.status === 'em_andamento' && (
                      <button
                        onClick={() => avancar(pedido.id, 'entregue')}
                        disabled={loading}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium cursor-pointer disabled:opacity-50 whitespace-nowrap"
                      >
                        <Check className="w-4 h-4" />
                        Entregue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

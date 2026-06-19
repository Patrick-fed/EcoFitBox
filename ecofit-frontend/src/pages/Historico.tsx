import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/useAuth';
import { listarPedidosPorUsuario, avancarStatus, confirmarEntrega, avaliarPedido } from '../api/pedidos';
import type { PedidoResponse } from '../types';
import { Package, Star, RefreshCw, Clock, CheckCircle, Truck, DollarSign } from 'lucide-react';

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pendente: { label: 'Pendente', icon: Clock, color: 'text-yellow-500' },
  pago: { label: 'Pago', icon: DollarSign, color: 'text-green-600' },
  em_preparo: { label: 'Em Preparo', icon: Package, color: 'text-blue-500' },
  em_andamento: { label: 'Em Andamento', icon: Truck, color: 'text-blue-500' },
  entregue: { label: 'Entregue', icon: CheckCircle, color: 'text-green-500' },
};

export function Historico() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
  const [avaliando, setAvaliando] = useState<number | null>(null);
  const [nota, setNota] = useState(0);

  useEffect(() => {
    if (usuario) {
      listarPedidosPorUsuario(usuario.id).then(setPedidos).catch(() => {});
    }
  }, [usuario]);

  const handleAvancar = async (id: number) => {
    try {
      const atualizado = await avancarStatus(id);
      setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, status: atualizado.status } : p)));
    } catch {
      alert('Erro ao avançar status');
    }
  };

  const handleConfirmar = async (id: number) => {
    try {
      await confirmarEntrega(id);
      setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'entregue' } : p)));
    } catch {
      alert('Erro ao confirmar entrega');
    }
  };

  const handleAvaliar = async (id: number) => {
    try {
      await avaliarPedido(id, { nota });
      setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, avaliacao: nota } : p)));
      setAvaliando(null);
      setNota(0);
    } catch {
      alert('Erro ao avaliar');
    }
  };

  const getStatusInfo = (status: string) => statusConfig[status] || { label: status, icon: Package, color: 'text-gray-500' };

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />

      <div className="pt-20 px-4 md:px-6 pb-10 max-w-3xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-[#3C5A1A] mb-6 flex items-center gap-2">
          <Package className="w-6 h-6" />
          Histórico de Pedidos
        </h1>

        {pedidos.length === 0 ? (
          <Card className="text-center py-12">
            <Package className="w-12 h-12 text-[#8FA86A] mx-auto mb-3" />
            <p className="text-[#5B5B3A]">Nenhum pedido ainda</p>
            <Button variant="primary" className="mt-4" onClick={() => navigate('/dashboard')}>
              Fazer primeiro pedido
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido) => {
              const { label, icon: StatusIcon, color } = getStatusInfo(pedido.status);

              return (
                <Card key={pedido.id}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-bold text-[#3C5A1A]">Pedido #{pedido.id}</span>
                        <span className={`text-xs font-semibold flex items-center gap-1 ${color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {label}
                        </span>
                      </div>

                      <p className="text-sm text-[#5B5B3A]">
                        {new Date(pedido.dataPedido).toLocaleDateString('pt-BR', {
                          day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-sm">
                        <span className="text-[#5B5B3A]">Pagamento: <span className="font-medium capitalize">{pedido.metodoPagamento}</span></span>
                        <span className="text-[#5B5B3A]">Frete: <span className="font-medium">{pedido.taxaEntrega > 0 ? 'R$ 5,00' : 'Grátis (plano ativo)'}</span></span>
                        <span className="text-[#5B5B3A]">Total: <span className="font-bold text-[#3C5A1A]">R$ {(pedido.total ?? 0).toFixed(2)}</span></span>
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:ml-4 flex-wrap">
                      {pedido.status === 'entregue' && !pedido.avaliacao && (
                        <Button
                          variant="secondary"
                          className="text-xs px-3 py-1.5"
                          onClick={() => setAvaliando(pedido.id)}
                        >
                          Avaliar
                        </Button>
                      )}
                      {pedido.status === 'pago' && (
                        <Button
                          variant="primary"
                          className="text-xs px-3 py-1.5"
                          onClick={() => handleAvancar(pedido.id)}
                        >
                          <Package className="w-3 h-3 mr-1" />
                          Iniciar Preparo
                        </Button>
                      )}
                      {pedido.status === 'em_preparo' && (
                        <Button
                          variant="primary"
                          className="text-xs px-3 py-1.5"
                          onClick={() => handleConfirmar(pedido.id)}
                        >
                          <Truck className="w-3 h-3 mr-1" />
                          Confirmar Entrega
                        </Button>
                      )}
                      {pedido.avaliacao && (
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < pedido.avaliacao! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {avaliando === pedido.id && (
                    <div className="mt-4 pt-4 border-t border-[#D8D4C5]">
                      <p className="text-sm font-medium text-[#3C5A1A] mb-2">Avalie seu pedido:</p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button key={i} onClick={() => setNota(i + 1)} className="cursor-pointer">
                            <Star className={`w-6 h-6 ${i < nota ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="primary" className="text-xs px-4 py-1.5" onClick={() => handleAvaliar(pedido.id)} disabled={nota === 0}>
                          Enviar
                        </Button>
                        <Button variant="outline" className="text-xs px-4 py-1.5" onClick={() => { setAvaliando(null); setNota(0); }}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex items-center gap-2 mx-auto">
            <RefreshCw className="w-4 h-4" />
            Novo Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}

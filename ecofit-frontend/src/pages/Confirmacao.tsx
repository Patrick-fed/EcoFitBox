import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { buscarPedido, avancarStatus } from '../api/pedidos';
import type { PedidoResponse } from '../types';
import { CheckCircle, Clock, Package, ArrowLeft, Home, Truck } from 'lucide-react';

interface ConfirmacaoState {
  metodo?: string;
  total?: number;
}

export function Confirmacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ConfirmacaoState;

  const [pedido, setPedido] = useState<PedidoResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    buscarPedido(Number(id)).then(setPedido).catch(() => {});
  }, [id]);

  const handleAvancar = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const atualizado = await avancarStatus(Number(id));
      setPedido(atualizado);
    } catch {
      alert('Erro ao avançar status');
    } finally {
      setLoading(false);
    }
  };

  const isPix = state?.metodo === 'pix';
  const total = state?.total || 0;

  const statusOrdem = ['pendente', 'pago', 'em_preparo', 'entregue'];

  const stepIndex = pedido ? statusOrdem.indexOf(pedido.status) : 0;

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />

      <div className="pt-20 px-6 pb-10 max-w-lg mx-auto">
        <Card className="text-center py-10">
          {isPix ? (
            <Clock className="w-20 h-20 text-[#F5A623] mx-auto mb-4" />
          ) : (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          )}

          <h2 className="text-2xl font-bold text-[#3C5A1A] mb-2">
            {isPix ? 'Aguardando Pagamento' : 'Pagamento Aprovado!'}
          </h2>

          <p className="text-[#5B5B3A] mb-6">
            {isPix
              ? 'Seu pedido será processado após a confirmação do pagamento Pix.'
              : 'Seu pedido já está na cozinha!'}
          </p>

          {pedido && (
            <div className="bg-[#F5F2EB] rounded-lg p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#5B5B3A]">Nº do Pedido:</span>
                <span className="font-bold text-[#3C5A1A]">#{pedido.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5B5B3A]">Status:</span>
                <span className="font-semibold capitalize">{pedido.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5B5B3A]">Total:</span>
                <span className="font-bold text-[#3C5A1A]">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#5B5B3A]">Pagamento:</span>
                <span className="font-semibold capitalize">{pedido.metodoPagamento}</span>
              </div>
            </div>
          )}

          {pedido && (
            <>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${stepIndex >= 0 ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 0 ? 'text-yellow-600 font-semibold' : 'text-[#5B5B3A]'}`}>Pendente</span>
                </div>
                <div className="w-8 h-px bg-[#D8D4C5]" />
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${stepIndex >= 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 1 ? 'text-green-600 font-semibold' : 'text-[#5B5B3A]'}`}>Pago</span>
                </div>
                <div className="w-8 h-px bg-[#D8D4C5]" />
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${stepIndex >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 2 ? 'text-blue-600 font-semibold' : 'text-[#5B5B3A]'}`}>Preparo</span>
                </div>
                <div className="w-8 h-px bg-[#D8D4C5]" />
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${stepIndex >= 3 ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 3 ? 'text-green-600 font-semibold' : 'text-[#5B5B3A]'}`}>Entrega</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center mb-3">
                {pedido.status !== 'entregue' && (
                  <Button
                    variant="primary"
                    onClick={handleAvancar}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    {pedido.status === 'pago' ? <Package className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                    {loading ? 'Avançando...' : pedido.status === 'pago' ? 'Iniciar Preparo' : 'Simular Entrega'}
                  </Button>
                )}
              </div>
            </>
          )}

          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Início
            </Button>
            <Button variant="primary" onClick={() => navigate('/historico')} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Meus Pedidos
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

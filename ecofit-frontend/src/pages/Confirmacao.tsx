import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { buscarPedido, avancarStatus, avaliarPedido } from '../api/pedidos';
import type { PedidoResponse } from '../types';
import { CheckCircle, Clock, Package, ArrowLeft, Home, Truck, Star } from 'lucide-react';

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
  const [avaliando, setAvaliando] = useState(false);
  const [nota, setNota] = useState(0);

  const handleAvaliar = async () => {
    if (!id) return;
    try {
      const atualizado = await avaliarPedido(Number(id), { nota });
      setPedido(atualizado);
      setAvaliando(false);
      setNota(0);
    } catch {
      alert('Erro ao avaliar');
    }
  };

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

      <div className="pt-20 px-4 md:px-6 pb-10 max-w-lg mx-auto">
        <Card className="text-center py-8 md:py-10 px-4 md:px-6">
          {isPix ? (
            <Clock className="w-16 md:w-20 h-16 md:h-20 text-[#F5A623] mx-auto mb-4" />
          ) : (
            <CheckCircle className="w-16 md:w-20 h-16 md:h-20 text-green-500 mx-auto mb-4" />
          )}

          <h2 className="text-xl md:text-2xl font-bold text-[#3C5A1A] mb-2">
            {isPix ? 'Aguardando Pagamento' : 'Pagamento Aprovado!'}
          </h2>

          <p className="text-[#5B5B3A] mb-6 text-sm md:text-base">
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
              <div className="flex items-center justify-center gap-1 md:gap-2 mb-6 overflow-x-auto pb-1">
                <div className="flex items-center gap-1 shrink-0">
                  <div className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${stepIndex >= 0 ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 0 ? 'text-yellow-600 font-semibold' : 'text-[#5B5B3A]'}`}>Pendente</span>
                </div>
                <div className="w-4 md:w-8 h-px bg-[#D8D4C5] shrink-0" />
                <div className="flex items-center gap-1 shrink-0">
                  <div className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${stepIndex >= 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 1 ? 'text-green-600 font-semibold' : 'text-[#5B5B3A]'}`}>Pago</span>
                </div>
                <div className="w-4 md:w-8 h-px bg-[#D8D4C5] shrink-0" />
                <div className="flex items-center gap-1 shrink-0">
                  <div className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${stepIndex >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 2 ? 'text-blue-600 font-semibold' : 'text-[#5B5B3A]'}`}>Preparo</span>
                </div>
                <div className="w-4 md:w-8 h-px bg-[#D8D4C5] shrink-0" />
                <div className="flex items-center gap-1 shrink-0">
                  <div className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${stepIndex >= 3 ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className={`text-xs ${stepIndex >= 3 ? 'text-green-600 font-semibold' : 'text-[#5B5B3A]'}`}>Entrega</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-3">
                {pedido.status !== 'entregue' && (
                  <Button
                    variant="primary"
                    onClick={handleAvancar}
                    disabled={loading}
                    className="flex items-center gap-2 justify-center"
                  >
                    {pedido.status === 'pago' ? <Package className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                    {loading ? 'Avançando...' : pedido.status === 'pago' ? 'Iniciar Preparo' : 'Simular Entrega'}
                  </Button>
                )}
              </div>

              {pedido.status === 'entregue' && !pedido.avaliacao && !avaliando && (
                <div className="mb-4">
                  <Button
                    variant="secondary"
                    className="text-sm px-4 py-2"
                    onClick={() => setAvaliando(true)}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Avaliar Pedido
                  </Button>
                </div>
              )}

              {pedido.status === 'entregue' && avaliando && (
                <div className="mb-4 p-4 bg-[#F5F2EB] rounded-lg">
                  <p className="text-sm font-medium text-[#3C5A1A] mb-2">Avalie seu pedido:</p>
                  <div className="flex items-center gap-1 mb-3 justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button key={i} onClick={() => setNota(i + 1)} className="cursor-pointer">
                        <Star className={`w-7 h-7 ${i < nota ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="primary" className="text-xs px-4 py-1.5" onClick={handleAvaliar} disabled={nota === 0}>
                      Enviar
                    </Button>
                    <Button variant="outline" className="text-xs px-4 py-1.5" onClick={() => { setAvaliando(false); setNota(0); }}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {pedido.status === 'entregue' && pedido.avaliacao && (
                <div className="flex items-center gap-1 mb-4 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < pedido.avaliacao! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="flex items-center gap-2 justify-center">
              <Home className="w-4 h-4" />
              Início
            </Button>
            <Button variant="primary" onClick={() => navigate('/historico')} className="flex items-center gap-2 justify-center">
              <ArrowLeft className="w-4 h-4" />
              Meus Pedidos
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { buscarBox } from '../api/boxes';
import { checkout } from '../api/pedidos';
import { criarPagamento } from '../api/pagamento';
import { buscarAssinaturaAtiva } from '../api/assinaturas';
import type { BoxResponse } from '../types';
import { ArrowLeft, CreditCard, QrCode, CheckCircle, Truck } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useAuth();
  const boxId = (location.state as any)?.boxId;

  const [box, setBox] = useState<BoxResponse | null>(null);
  const [planoAtivo, setPlanoAtivo] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const taxaEntrega = planoAtivo ? 0 : 5;
  const total = (box?.preco || 0) + taxaEntrega;

  useEffect(() => {
    if (!boxId || !usuario) return;
    buscarBox(boxId).then(setBox).catch(() => navigate('/dashboard'));
    buscarAssinaturaAtiva(usuario.id).then((a) => setPlanoAtivo(a.ativo)).catch(() => {});
  }, [boxId, usuario]);

  const handleFinalizar = async () => {
    if (!usuario || !box) return;
    setLoading(true);
    try {
      const pedido = await checkout({
        boxId: box.id,
        usuarioId: usuario.id,
        metodoPagamento,
        enderecoEntrega: usuario.endereco,
      });

      const pagamento = await criarPagamento({
        pedidoId: pedido.id,
        metodoPagamento,
      });

      if (metodoPagamento === 'pix') {
        setQrCode(pagamento.paymentId);
      }

      navigate(`/confirmacao/${pedido.id}`, {
        state: {
          metodo: metodoPagamento,
          total,
          qrCode: metodoPagamento === 'pix' ? pagamento.paymentId : undefined,
        },
      });
    } catch {
      alert('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  if (!box) {
    return (
      <div className="min-h-screen bg-[#EDE7DF] flex items-center justify-center">
        <p className="text-[#8FA86A]">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />

      <div className="pt-20 px-6 pb-10 max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 text-sm text-[#5B7B3A] hover:text-[#3C5A1A] mb-4 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <h1 className="text-2xl font-bold text-[#3C5A1A] mb-6">Checkout</h1>

        <Card className="mb-6">
          <h2 className="font-bold text-[#3C5A1A] mb-3">Resumo do Pedido</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#5B5B3A]">Box:</span>
              <span className="font-semibold">{box.nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5B5B3A]">Descrição:</span>
              <span>{box.descricao || '-'}</span>
            </div>
            <div className="border-t border-[#D8D4C5] my-2" />
            <div className="flex justify-between">
              <span className="text-[#5B5B3A]">Subtotal:</span>
              <span>R$ {box.preco.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-[#8FA86A]" />
                <span className="text-[#5B5B3A]">Taxa de entrega:</span>
              </div>
              <span className={planoAtivo ? 'text-green-600 font-medium' : ''}>
                {planoAtivo ? 'R$ 0,00 (plano ativo)' : `R$ ${taxaEntrega.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t-2 border-[#3C5A1A] my-2" />
            <div className="flex justify-between text-lg">
              <span className="font-bold text-[#3C5A1A]">Total:</span>
              <span className="font-black text-[#3C5A1A]">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h2 className="font-bold text-[#3C5A1A] mb-4">Forma de Pagamento</h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMetodoPagamento('pix')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                metodoPagamento === 'pix' ? 'border-[#3C5A1A] bg-[#F0F5EA]' : 'border-[#D8D4C5] hover:border-[#A3B27A]'
              }`}
            >
              <QrCode className={`w-8 h-8 ${metodoPagamento === 'pix' ? 'text-[#3C5A1A]' : 'text-[#8FA86A]'}`} />
              <span className={`text-sm font-semibold ${metodoPagamento === 'pix' ? 'text-[#3C5A1A]' : 'text-[#5B5B3A]'}`}>Pix</span>
              <span className="text-xs text-[#8FA86A]">QR Code</span>
            </button>

            <button
              onClick={() => setMetodoPagamento('cartao')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                metodoPagamento === 'cartao' ? 'border-[#3C5A1A] bg-[#F0F5EA]' : 'border-[#D8D4C5] hover:border-[#A3B27A]'
              }`}
            >
              <CreditCard className={`w-8 h-8 ${metodoPagamento === 'cartao' ? 'text-[#3C5A1A]' : 'text-[#8FA86A]'}`} />
              <span className={`text-sm font-semibold ${metodoPagamento === 'cartao' ? 'text-[#3C5A1A]' : 'text-[#5B5B3A]'}`}>Cartão</span>
              <span className="text-xs text-[#8FA86A]">Crédito/Débito</span>
            </button>
          </div>

          {metodoPagamento === 'cartao' && (
            <div className="mt-4 space-y-3 p-4 bg-[#F5F2EB] rounded-lg">
              <input
                type="text"
                placeholder="Número do cartão"
                className="w-full px-3 py-2 rounded-lg border border-[#D8D4C5] text-sm focus:outline-none focus:ring-2 focus:ring-[#A3B27A]"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Validade (MM/AA)"
                  className="px-3 py-2 rounded-lg border border-[#D8D4C5] text-sm focus:outline-none focus:ring-2 focus:ring-[#A3B27A]"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="px-3 py-2 rounded-lg border border-[#D8D4C5] text-sm focus:outline-none focus:ring-2 focus:ring-[#A3B27A]"
                />
              </div>
              <p className="text-xs text-[#8FA86A]">Dados tokenizados - nunca passam pelo nosso servidor</p>
            </div>
          )}

          {metodoPagamento === 'pix' && qrCode && (
            <div className="mt-4 p-4 bg-[#F5F2EB] rounded-lg text-center">
              <QrCode className="w-32 h-32 mx-auto mb-2 text-[#3C5A1A]" />
              <p className="text-sm font-medium text-[#3C5A1A]">Escaneie o QR Code</p>
              <p className="text-xs text-[#5B5B3A] mt-1 break-all">{qrCode}</p>
            </div>
          )}
        </Card>

        <Button
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleFinalizar}
          disabled={loading}
        >
          <CheckCircle className="w-4 h-4" />
          {loading ? 'Processando...' : 'Finalizar Pedido'}
        </Button>
      </div>
    </div>
  );
}

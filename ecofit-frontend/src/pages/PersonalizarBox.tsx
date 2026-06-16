import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { listarItens } from '../api/itens';
import { criarBox } from '../api/boxes';
import type { ItemResponse } from '../types';
import { Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';

interface ItemSelecionado extends ItemResponse {
  quantidade: number;
}

export function PersonalizarBox() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [itens, setItens] = useState<ItemResponse[]>([]);
  const [selecionados, setSelecionados] = useState<ItemSelecionado[]>([]);
  const [nomeBox, setNomeBox] = useState('Minha Box Personalizada');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listarItens().then(setItens).catch(() => {});
  }, []);

  const addItem = (item: ItemResponse) => {
    setSelecionados((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i));
      }
      return [...prev, { ...item, quantidade: 1 }];
    });
  };

  const removeItem = (item: ItemResponse) => {
    setSelecionados((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente && existente.quantidade > 1) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantidade: i.quantidade - 1 } : i));
      }
      return prev.filter((i) => i.id !== item.id);
    });
  };

  const total = selecionados.reduce((acc, item) => acc + item.itemValor * item.quantidade, 0);

  const handleCriarPedido = async () => {
    if (!usuario || selecionados.length === 0) return;
    setLoading(true);
    try {
      const box = await criarBox({
        nome: nomeBox,
        preco: total,
        tipo: 'personalizado',
        usuarioId: usuario.id,
        itens: selecionados.map((i) => ({ itemId: i.id, quantidade: i.quantidade })),
      });
      navigate('/checkout', { state: { boxId: box.id } });
    } catch {
      alert('Erro ao criar box personalizada');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />

      <div className="pt-20 px-6 pb-10 max-w-6xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 text-sm text-[#5B7B3A] hover:text-[#3C5A1A] mb-4 cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <h1 className="text-2xl font-bold text-[#3C5A1A] mb-6">Monte sua Box</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-[#3C5A1A] mb-3">Itens disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {itens.map((item) => (
                <Card key={item.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-sm">{item.itemNome}</h3>
                      <p className="text-xs text-[#5B5B3A] mt-0.5">{item.itemDescricao}</p>
                      <p className="text-sm font-bold text-[#3C5A1A] mt-1">R$ {item.itemValor.toFixed(2)}</p>
                    </div>
                    <button onClick={() => addItem(item)} className="p-1.5 bg-[#3C5A1A] text-white rounded-full hover:bg-[#2E4513] transition cursor-pointer">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="font-bold text-[#3C5A1A] mb-3 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Sua Box
              </h2>

              <input
                type="text"
                value={nomeBox}
                onChange={(e) => setNomeBox(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-lg border border-[#D8D4C5] mb-4 focus:outline-none focus:ring-2 focus:ring-[#A3B27A]"
                placeholder="Nome da sua box"
              />

              {selecionados.length === 0 ? (
                <p className="text-sm text-[#8FA86A] text-center py-6">Nenhum item selecionado</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {selecionados.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-1.5 border-b border-[#D8D4C5] last:border-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.itemNome}</p>
                        <p className="text-xs text-[#5B5B3A]">R$ {(item.itemValor * item.quantidade).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeItem(item)} className="p-1 bg-[#D8D4C5] rounded-full hover:bg-[#c0bba8] cursor-pointer">
                          <Minus className="w-3 h-3 text-[#5B5B3A]" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{item.quantidade}</span>
                        <button onClick={() => addItem(item)} className="p-1 bg-[#D8D4C5] rounded-full hover:bg-[#c0bba8] cursor-pointer">
                          <Plus className="w-3 h-3 text-[#5B5B3A]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-[#D8D4C5] pt-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#3C5A1A]">Total</span>
                  <span className="text-xl font-black text-[#3C5A1A]">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                disabled={selecionados.length === 0 || loading}
                onClick={handleCriarPedido}
              >
                {loading ? 'Criando...' : 'Ir para Checkout'}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

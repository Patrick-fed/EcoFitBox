import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { PlanosSidebar } from '../components/layout/PlanosSidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { listarBoxesMaisPedidas, listarBoxes } from '../api/boxes';
import { buscarAssinaturaAtiva } from '../api/assinaturas';
import type { BoxMaisPedidaResponse, BoxResponse, AssinaturaPlanoResponse } from '../types';
import { TrendingUp, Settings, Coffee, UtensilsCrossed, Pizza, ShoppingBag, Star, Plus } from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [maisPedidas, setMaisPedidas] = useState<BoxMaisPedidaResponse[]>([]);
  const [boxes, setBoxes] = useState<BoxResponse[]>([]);
  const [assinatura, setAssinatura] = useState<AssinaturaPlanoResponse | null>(null);
  const [filtro, setFiltro] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    listarBoxesMaisPedidas().then(setMaisPedidas).catch(() => {});
    if (usuario) {
      buscarAssinaturaAtiva(usuario.id).then(setAssinatura).catch(() => setAssinatura(null));
    }
  }, [usuario]);

  useEffect(() => {
    listarBoxes().then(setBoxes).catch(() => {});
  }, []);

  const filtros: { label: string; value: string; icon: typeof Coffee }[] = [
    { label: 'Todas', value: '', icon: Star },
    { label: 'Café da Manhã', value: 'cafe', icon: Coffee },
    { label: 'Almoço', value: 'almoco', icon: UtensilsCrossed },
    { label: 'Jantar', value: 'jantar', icon: Pizza },
  ];

  const groupedBoxes = useMemo(() => {
    const filtered = filtro
      ? boxes.filter((b) => b.tipoRefeicao === filtro || b.tipo === 'personalizado')
      : boxes;

    return {
      cafe: filtered.filter((b) => (b.tipoRefeicao === 'cafe' || !b.tipoRefeicao) && b.tipo === 'padrao'),
      almoco: filtered.filter((b) => b.tipoRefeicao === 'almoco' && b.tipo === 'padrao'),
      jantar: filtered.filter((b) => b.tipoRefeicao === 'jantar' && b.tipo === 'padrao'),
      personalizado: filtered.filter((b) => b.tipo === 'personalizado'),
    };
  }, [boxes, filtro]);

  const mealEmoji = (box: BoxResponse) =>
    box.tipoRefeicao === 'cafe' ? '☕' : box.tipoRefeicao === 'almoco' ? '🥙' : box.tipoRefeicao === 'jantar' ? '🍽️' : '📦';

  const renderBoxCard = (box: BoxResponse) => (
    <Card
      key={box.id}
      className="p-6 hover:border-[#A3B27A] transition-all"
      onClick={() => navigate('/checkout', { state: { boxId: box.id } })}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-white bg-[#5B7B3A] px-2 py-0.5 rounded-full">
          {box.tipo}
        </span>
        <span className="text-base text-[#3C5A1A] font-bold">{mealEmoji(box)}</span>
      </div>
      <h3 className="font-bold text-[#1a1a2e] text-lg">{box.nome}</h3>
      <p className="text-sm text-[#5B5B3A] mt-1.5 line-clamp-2">{box.descricao || 'Box nutritiva e saborosa'}</p>
      <div className="flex items-center justify-between mt-5 pt-3 border-t border-[#D8D4C5]">
        <span className="text-xl font-bold text-[#3C5A1A]">R$ {box.preco.toFixed(2)}</span>
        <ShoppingBag className="w-5 h-5 text-[#8FA86A]" />
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#EDE7DF]">
      <Navbar />

      <div
        className={`pt-20 px-6 pb-10 max-w-[1600px] mx-auto transition-all duration-300 ${
          sidebarOpen ? 'lg:pr-80' : 'lg:pr-16'
        }`}
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#3C5A1A]">Olá, {usuario?.nome}!</h1>
            <p className="text-[#5B5B3A] mt-1">Escolha sua box perfeita para hoje</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/personalizar')} className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Montar minha box
          </Button>
        </div>

        {maisPedidas.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-[#5B7B3A]" />
              <h2 className="text-lg font-bold text-[#3C5A1A]">Boxes mais pedidas</h2>
            </div>
            <div className={`flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-thin ${sidebarOpen ? 'lg:pr-80' : 'lg:pr-16'}`}>
              {maisPedidas.map((box) => (
                <Card
                  key={box.id}
                  className="min-w-[260px] shrink-0 p-6 hover:border-[#A3B27A] transition-all"
                  onClick={() => navigate('/checkout', { state: { boxId: box.id } })}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-white bg-[#5B7B3A] px-2 py-0.5 rounded-full">
                      {box.totalPedidos} pedidos
                    </span>
                  </div>
                  <h3 className="font-bold text-[#1a1a2e] text-base">{box.nome}</h3>
                  <p className="text-sm text-[#5B5B3A] mt-1 line-clamp-2">{box.descricao || 'Box nutritiva e saborosa'}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D8D4C5]">
                    <span className="font-bold text-[#3C5A1A] text-lg">R$ {box.preco.toFixed(2)}</span>
                    <ShoppingBag className="w-5 h-5 text-[#8FA86A]" />
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-2 mb-8 flex-wrap">
          {filtros.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFiltro(value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                filtro === value
                  ? 'bg-[#3C5A1A] text-white'
                  : 'bg-white text-[#5B5B3A] border border-[#D8D4C5] hover:border-[#A3B27A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div
          className={`grid gap-6 ${
            filtro === '' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {(filtro === '' || filtro === 'cafe') && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-[#5B7B3A]" />
                <h3 className="font-bold text-[#3C5A1A] text-base">Café da Manhã</h3>
              </div>
              {groupedBoxes.cafe.length === 0 ? (
                <p className="text-sm text-[#8FA86A] py-4 text-center">Nenhuma box disponível</p>
              ) : (
                groupedBoxes.cafe.map(renderBoxCard)
              )}
            </div>
          )}

          {(filtro === '' || filtro === 'almoco') && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-[#5B7B3A]" />
                <h3 className="font-bold text-[#3C5A1A] text-base">Almoço</h3>
              </div>
              {groupedBoxes.almoco.length === 0 ? (
                <p className="text-sm text-[#8FA86A] py-4 text-center">Nenhuma box disponível</p>
              ) : (
                groupedBoxes.almoco.map(renderBoxCard)
              )}
            </div>
          )}

          {(filtro === '' || filtro === 'jantar') && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Pizza className="w-5 h-5 text-[#5B7B3A]" />
                <h3 className="font-bold text-[#3C5A1A] text-base">Jantar</h3>
              </div>
              {groupedBoxes.jantar.length === 0 ? (
                <p className="text-sm text-[#8FA86A] py-4 text-center">Nenhuma box disponível</p>
              ) : (
                groupedBoxes.jantar.map(renderBoxCard)
              )}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#5B7B3A]" />
              <h3 className="font-bold text-[#3C5A1A] text-base">Box Personalizada</h3>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/personalizar')}
              className="flex items-center justify-center gap-2 w-full"
            >
              <Plus className="w-4 h-4" />
              Criar box
            </Button>
            {groupedBoxes.personalizado.length === 0 ? (
              <p className="text-sm text-[#8FA86A] py-4 text-center">Nenhuma box personalizada</p>
            ) : (
              groupedBoxes.personalizado.map(renderBoxCard)
            )}
          </div>
        </div>
      </div>

      <PlanosSidebar assinatura={assinatura} open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
    </div>
  );
}
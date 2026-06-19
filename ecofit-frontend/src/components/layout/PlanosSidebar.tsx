import { useState } from 'react';
import { Diamond, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { criarAssinatura } from '../../api/assinaturas';
import type { AssinaturaPlanoResponse } from '../../types';

interface PlanosSidebarProps {
  assinatura: AssinaturaPlanoResponse | null;
  usuarioId: number;
  open: boolean;
  onToggle: () => void;
  onAssinaturaCriada?: (assinatura: AssinaturaPlanoResponse) => void;
}

function PlanosContent({ assinatura, loading, onContratar }: {
  assinatura: AssinaturaPlanoResponse | null;
  loading: boolean;
  onContratar: (plano: string) => void;
}) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Diamond className="w-5 h-5 text-[#5B7B3A]" />
        <h2 className="font-bold text-[#3C5A1A]">Planos</h2>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onContratar('Semanal')}
          disabled={loading || !!assinatura?.ativo}
          className="w-full p-3 bg-[#F5F2EB] rounded-lg border border-[#D8D4C5] text-left hover:border-[#A3B27A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#3C5A1A]">Semanal</h3>
            <span className="text-sm font-bold text-[#3C5A1A]">R$ 10</span>
          </div>
          <p className="text-xs text-[#5B5B3A]">7 dias de entrega</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-[#E8F0D6] text-[#3C5A1A] px-1.5 py-0.5 rounded font-medium">10% OFF</span>
            <p className="text-xs text-[#8FA86A] font-medium">Frete grátis incluso</p>
          </div>
        </button>
        <button
          onClick={() => onContratar('Mensal')}
          disabled={loading || !!assinatura?.ativo}
          className="w-full p-3 bg-[#F5F2EB] rounded-lg border border-[#D8D4C5] text-left hover:border-[#A3B27A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#3C5A1A]">Mensal</h3>
            <span className="text-sm font-bold text-[#3C5A1A]">R$ 90</span>
          </div>
          <p className="text-xs text-[#5B5B3A]">30 dias de entrega</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-[#E8F0D6] text-[#3C5A1A] px-1.5 py-0.5 rounded font-medium">10% OFF</span>
            <p className="text-xs text-[#8FA86A] font-medium">Frete grátis incluso</p>
          </div>
        </button>
      </div>

      <div
        className={`mt-4 p-3 rounded-lg text-center text-sm font-semibold ${
          assinatura?.ativo ? 'bg-green-100 text-green-700' : 'bg-[#D8D4C5] text-[#5B5B3A]'
        }`}
      >
        {assinatura?.ativo ? `Plano ${assinatura.plano} ativo` : 'Contratar plano'}
      </div>
    </Card>
  );
}

export function PlanosSidebar({ assinatura, usuarioId, open, onToggle, onAssinaturaCriada }: PlanosSidebarProps) {
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleContratarPlano = async (plano: string) => {
    if (loading || assinatura?.ativo) return;

    const dias = plano === 'Semanal' ? 7 : 30;
    const hoje = new Date();
    const dataInicio = hoje.toISOString().split('T')[0];
    const dataFim = new Date(hoje.getTime() + dias * 86400000).toISOString().split('T')[0];

    if (!window.confirm(`Deseja contratar o plano ${plano}?`)) return;

    setLoading(true);
    try {
      const resposta = await criarAssinatura({ usuarioId, plano, dataInicio, dataFim });
      onAssinaturaCriada?.(resposta);
      setMobileOpen(false);
    } catch (err) {
      console.error('Erro ao contratar plano:', err);
      alert('Erro ao contratar plano. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed top-20 right-0 bottom-0 z-40 hidden lg:block transition-all duration-300 ${
          open ? 'w-72' : 'w-12'
        }`}
      >
        <button
          onClick={onToggle}
          className="absolute top-4 -left-4 w-8 h-8 rounded-full bg-[#3C5A1A] text-white flex items-center justify-center shadow-md hover:bg-[#2E4513] transition-colors cursor-pointer z-10"
          title={open ? 'Minimizar planos' : 'Expandir planos'}
        >
          {open ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {open ? (
          <div className="h-full overflow-y-auto pt-6 pr-6 pl-2">
              <PlanosContent assinatura={assinatura} loading={loading} onContratar={handleContratarPlano} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Diamond className="w-5 h-5 text-[#5B7B3A]" />
          </div>
        )}
      </aside>

      {/* Mobile floating button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#3C5A1A] text-white flex items-center justify-center shadow-lg hover:bg-[#2E4513] transition-colors cursor-pointer"
        title="Ver planos"
      >
        <Diamond className="w-6 h-6" />
      </button>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#EDE7DF] rounded-t-2xl shadow-2xl lg:hidden animate-slide-up">
            <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-[#D8D4C5]">
              <h2 className="font-bold text-[#3C5A1A] text-lg">Planos de Assinatura</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-[#5B5B3A] hover:bg-[#D8D4C5] rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
            <PlanosContent assinatura={assinatura} loading={loading} onContratar={handleContratarPlano} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
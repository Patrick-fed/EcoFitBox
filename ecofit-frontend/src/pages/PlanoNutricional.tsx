import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PresentationCover } from '../components/layout/PresentationCover';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/useAuth';
import { criarPlanoNutricional } from '../api/planoNutricional';
import { ClipboardList, ArrowRight, FileText, Upload } from 'lucide-react';

export function PlanoNutricional() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [temPlano, setTemPlano] = useState<boolean | null>(null);
  const [objetivo, setObjetivo] = useState('');
  const [restricoes, setRestricoes] = useState('');
  const [calorias, setCalorias] = useState('');
  const [proteinas, setProteinas] = useState('');
  const [carboidratos, setCarboidratos] = useState('');
  const [gorduras, setGorduras] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);
  const [arquivoPlano, setArquivoPlano] = useState('');
  const [arquivoNome, setArquivoNome] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArquivoNome(file.name);
    const reader = new FileReader();
    reader.onload = () => setArquivoPlano(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;
    setLoading(true);
    try {
      await criarPlanoNutricional({
        usuarioId: usuario.id,
        objetivo,
        restricoes,
        caloriasDiarias: Number(calorias),
        proteinas: Number(proteinas),
        carboidratos: Number(carboidratos),
        gorduras: Number(gorduras),
        observacoes,
        arquivoPlano: arquivoPlano || undefined,
      });
      navigate('/dashboard');
    } catch {
      alert('Erro ao salvar plano nutricional');
    } finally {
      setLoading(false);
    }
  };

  if (temPlano === null) {
    return (
      <PresentationCover>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 w-full max-w-lg border border-[#D8D4C5] text-center">
            <ClipboardList className="w-16 h-16 text-[#5B7B3A] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#3C5A1A] mb-2">Acompanhamento Nutricional</h2>
            <p className="text-[#5B5B3A] mb-8">Você faz acompanhamento nutricional?</p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" onClick={() => setTemPlano(true)}>
                Sim <ArrowRight className="w-4 h-4 inline ml-1" />
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Não
              </Button>
            </div>
          </div>
        </div>
      </PresentationCover>
    );
  }

  return (
    <PresentationCover>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-lg border border-[#D8D4C5]">
          <h2 className="text-xl font-bold text-[#3C5A1A] mb-6 flex items-center gap-2">
            <ClipboardList className="w-5 h-5" />
            Seu Plano Nutricional
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Objetivo" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} placeholder="Ex: Perda de peso, ganho muscular" />
            <Input label="Restrições alimentares" value={restricoes} onChange={(e) => setRestricoes(e.target.value)} placeholder="Ex: Sem glúten, sem lactose" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Calorias diárias (kcal)" type="number" value={calorias} onChange={(e) => setCalorias(e.target.value)} placeholder="2000" />
              <Input label="Proteínas (g)" type="number" value={proteinas} onChange={(e) => setProteinas(e.target.value)} placeholder="120" />
              <Input label="Carboidratos (g)" type="number" value={carboidratos} onChange={(e) => setCarboidratos(e.target.value)} placeholder="250" />
              <Input label="Gorduras (g)" type="number" value={gorduras} onChange={(e) => setGorduras(e.target.value)} placeholder="60" />
            </div>
            <Input label="Observações" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Observações adicionais" />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#D8D4C5] rounded-lg p-6 text-center cursor-pointer hover:border-[#A3B27A] transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf"
                className="hidden"
              />
              {arquivoNome ? (
                <>
                  <Upload className="w-8 h-8 text-[#3C5A1A] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#3C5A1A]">{arquivoNome}</p>
                  <p className="text-xs text-[#8FA86A] mt-1">Clique para trocar o arquivo</p>
                </>
              ) : (
                <>
                  <FileText className="w-8 h-8 text-[#8FA86A] mx-auto mb-2" />
                  <p className="text-sm text-[#5B5B3A]">Envie seu plano em PDF (opcional)</p>
                  <p className="text-xs text-[#8FA86A] mt-1">Clique para selecionar</p>
                </>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar e Continuar'}
            </Button>
          </form>
        </div>
      </div>
    </PresentationCover>
  );
}

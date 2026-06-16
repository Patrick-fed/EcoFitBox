import { useNavigate } from 'react-router-dom';
import { PresentationCover } from '../components/layout/PresentationCover';
import { LogoSection } from '../components/ui/LogoSection';
import { CircleIcon } from '../components/ui/CircleIcon';
import { Button } from '../components/ui/Button';
import { Users, GraduationCap, ArrowRight } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <PresentationCover>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="flex flex-col justify-center items-center px-8">
          <LogoSection subtitle="ALIMENTAÇÃO SAUDÁVEL" />

          <div className="mt-10 space-y-6">
            <div className="flex gap-4 items-start">
              <CircleIcon>
                <Users className="w-6 h-6 text-[#3C5A1A]" />
              </CircleIcon>
              <div>
                <h3 className="font-bold text-[#3C5A1A] text-sm tracking-wider">ALUNOS:</h3>
                <p className="text-[#5B5B3A] text-sm leading-relaxed max-w-xs">
                  CARINE DE OLIVEIRA, EMILI LORENZETTI, EMILY TOGNON E LETICIA SILVESTRE MARIN
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CircleIcon>
                <GraduationCap className="w-6 h-6 text-[#3C5A1A]" />
              </CircleIcon>
              <div>
                <h3 className="font-bold text-[#3C5A1A] text-sm tracking-wider">ORIENTADOR:</h3>
                <p className="text-[#5B5B3A] text-sm">ROGIANE PANISSON</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Button variant="primary" onClick={() => navigate('/register')}>
              Criar Conta <ArrowRight className="w-4 h-4 inline ml-1" />
            </Button>
            <Button variant="outline" onClick={() => navigate('/login')}>
              Entrar
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center relative">
          <div className="w-[420px] h-[420px] bg-[#D8D4C5] rounded-full flex items-center justify-center shadow-inner">
            <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="text-center">
                <svg width="80" height="54" viewBox="0 0 24 24" fill="none" className="mx-auto text-[#5B7B3A]">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" fill="currentColor" />
                </svg>
                <h2 className="text-3xl font-black text-[#3C5A1A] mt-2">ECOFIT</h2>
                <p className="text-[#8FA86A] font-semibold tracking-widest text-sm">BOX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PresentationCover>
  );
}

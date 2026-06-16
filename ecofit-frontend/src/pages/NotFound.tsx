import { Link } from 'react-router-dom';
import { PresentationCover } from '../components/layout/PresentationCover';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <PresentationCover>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-8xl font-black text-[#A3B27A]">404</h1>
        <p className="text-xl text-[#5B5B3A] mt-2 mb-6">Página não encontrada</p>
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-[#3C5A1A] text-white rounded-lg font-semibold hover:bg-[#2E4513] transition"
        >
          <Home className="w-4 h-4" />
          Voltar ao início
        </Link>
      </div>
    </PresentationCover>
  );
}

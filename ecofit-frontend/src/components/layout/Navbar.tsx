import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Utensils, Shield, Truck } from 'lucide-react';

export function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EDE7DF]/90 backdrop-blur-md border-b border-[#D8D4C5] px-6 py-3 flex items-center justify-between">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/dashboard')}
      >
        <div className="w-8 h-8 bg-[#3C5A1A] rounded-lg flex items-center justify-center">
          <Utensils className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[#3C5A1A] text-lg">EcoFit</span>
      </div>

      <div className="flex items-center gap-4">
        {(usuario?.tipo === 'ADMIN' || usuario?.tipo === 'ENTREGADOR') && (
          <button
            onClick={() => navigate('/entregador')}
            className="flex items-center gap-1 text-sm text-[#5B7B3A] hover:text-[#3C5A1A] transition-colors cursor-pointer"
            title="Entregas"
          >
            <Truck className="w-4 h-4" />
            <span className="hidden sm:inline">Entregas</span>
          </button>
        )}
        {usuario?.tipo === 'ADMIN' && (
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-1 text-sm text-[#5B7B3A] hover:text-[#3C5A1A] transition-colors cursor-pointer"
            title="Administração"
          >
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        )}
        <span className="text-sm text-[#5B7B3A] font-medium flex items-center gap-1">
          <User className="w-4 h-4" />
          {usuario?.nome}
        </span>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-1 text-sm text-[#3C5A1A] hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </nav>
  );
}

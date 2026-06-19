import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Utensils, Shield, Truck, Menu, X } from 'lucide-react';

export function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    ...(usuario?.tipo === 'ADMIN' || usuario?.tipo === 'ENTREGADOR'
      ? [{ label: 'Entregas', icon: Truck, onClick: () => navigate('/entregador') }]
      : []),
    ...(usuario?.tipo === 'ADMIN'
      ? [{ label: 'Admin', icon: Shield, onClick: () => navigate('/admin') }]
      : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EDE7DF]/90 backdrop-blur-md border-b border-[#D8D4C5] px-4 md:px-6 py-3 flex items-center justify-between">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}
      >
        <div className="w-8 h-8 bg-[#3C5A1A] rounded-lg flex items-center justify-center">
          <Utensils className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-[#3C5A1A] text-lg">EcoFit</span>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={link.onClick}
            className="flex items-center gap-1 text-sm text-[#5B7B3A] hover:text-[#3C5A1A] transition-colors cursor-pointer"
            title={link.label}
          >
            <link.icon className="w-4 h-4" />
            <span>{link.label}</span>
          </button>
        ))}
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

      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden p-2 text-[#3C5A1A] hover:bg-[#D8D4C5] rounded-lg transition cursor-pointer"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-[#EDE7DF] z-50 shadow-2xl md:hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#D8D4C5]">
              <span className="font-bold text-[#3C5A1A]">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-[#3C5A1A] hover:bg-[#D8D4C5] rounded transition cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => { setMobileOpen(false); link.onClick(); }}
                  className="flex items-center gap-3 w-full px-3 py-3 text-sm text-[#5B7B3A] hover:bg-[#D8D4C5] rounded-lg transition cursor-pointer"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              ))}
              <div className="border-t border-[#D8D4C5] my-2" />
              <div className="flex items-center gap-3 px-3 py-3 text-sm text-[#5B7B3A]">
                <User className="w-4 h-4" />
                {usuario?.nome}
              </div>
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-3 w-full px-3 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', type = 'button', disabled, className = '' }: ButtonProps) {
  const base = 'px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-[#3C5A1A] text-white hover:bg-[#2E4513] shadow-md',
    secondary: 'bg-[#A3B27A] text-white hover:bg-[#8FA86A] shadow-md',
    outline: 'border-2 border-[#3C5A1A] text-[#3C5A1A] hover:bg-[#3C5A1A] hover:text-white',
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

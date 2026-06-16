import type { ReactNode } from 'react';

interface CircleIconProps {
  children: ReactNode;
  className?: string;
}

export function CircleIcon({ children, className = '' }: CircleIconProps) {
  return (
    <div className={`w-14 h-14 rounded-full bg-[#D8D4C5] flex items-center justify-center shrink-0 ${className}`}>
      {children}
    </div>
  );
}

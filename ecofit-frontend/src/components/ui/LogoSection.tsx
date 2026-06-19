interface LogoSectionProps {
  subtitle?: string;
}

export function LogoSection({ subtitle }: LogoSectionProps) {
  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="54" viewBox="0 0 24 24" fill="none" className="text-[#5B7B3A]">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" fill="currentColor" />
      </svg>
      <h1 className="text-4xl md:text-7xl font-black text-[#3C5A1A] tracking-tight mt-2">ECOFIT</h1>
      <div className="flex items-center gap-2 md:gap-4 mt-1">
        <div className="w-12 md:w-24 h-[3px] bg-[#5B7B3A]" />
        <span className="text-xl md:text-3xl font-bold text-[#3C5A1A] tracking-widest">BOX</span>
        <div className="w-12 md:w-24 h-[3px] bg-[#5B7B3A]" />
      </div>
      {subtitle && (
        <p className="text-[#5B7B3A] text-lg font-medium mt-2 tracking-wide">{subtitle}</p>
      )}
    </div>
  );
}

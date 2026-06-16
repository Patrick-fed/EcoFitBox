import type { ReactNode } from 'react';
import { BackgroundShapes } from '../ui/BackgroundShapes';
import { DecorativeLeaves } from '../ui/DecorativeLeaves';

interface PresentationCoverProps {
  children: ReactNode;
  showDecorations?: boolean;
}

export function PresentationCover({ children, showDecorations = true }: PresentationCoverProps) {
  return (
    <section className="relative w-full min-h-screen bg-[#EDE7DF] overflow-hidden">
      {showDecorations && <BackgroundShapes />}
      {showDecorations && <DecorativeLeaves />}
      {children}
    </section>
  );
}

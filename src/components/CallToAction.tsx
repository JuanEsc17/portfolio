import React from 'react';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface CallToActionProps {
  onOpenContact: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenContact }) => {
  return (
    <div className="bg-purple-grid p-6 md:p-8 lg:p-10 flex flex-col justify-between h-full relative overflow-hidden border-t-2 md:border-t-0 md:border-l-2 border-black min-h-[320px]">
      <div>
        {/* Título Llamativo en Blanco */}
        <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-tight mb-8">
          {portfolioData.cta.heading}
        </h2>

        {/* Botón Contáctame */}
        <button
          onClick={onOpenContact}
          className="bg-white text-black border-2 border-black shadow-neo px-5 py-3 font-mono text-xs md:text-sm font-bold uppercase neo-btn inline-flex items-center gap-2 relative z-10"
        >
          <span>{portfolioData.cta.buttonText}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Insignia estrellada (Starburst) decorativa estilo Sticker en la esquina inferior derecha */}
      <div className="absolute -bottom-6 -right-6 pointer-events-none select-none z-0">
        <svg 
          className="w-32 h-32 drop-shadow-[2px_2px_0px_#000]" 
          viewBox="0 0 100 100" 
          fill="#FF708F" 
          stroke="#000000" 
          strokeWidth="3"
        >
          <path d="M50 0 L61 24 L86 14 L80 40 L100 50 L80 60 L86 86 L61 76 L50 100 L39 76 L14 86 L20 60 L0 50 L20 40 L14 14 L39 24 Z" />
        </svg>
      </div>
    </div>
  );
};

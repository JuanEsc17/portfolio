import React from 'react';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SkillsBar: React.FC = () => {
  // SVGs específicos para cada tecnología técnica
  const renderSkillIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'python':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.81v.825H3.88S0 5.762 0 11.885c0 6.124 3.398 5.908 3.398 5.908h2.027v-2.836s-.11-3.398 3.344-3.398h5.757v-.855s.31-3.69-5.612-3.69zM8.7 1.83a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zm3.386 22.17c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75h-5.81v-.825h8.136s3.88.47 3.88-5.653c0-6.123-3.398-5.908-3.398-5.908h-2.027v2.836s.11 3.398-3.344 3.398H9.485v.855s-.31 3.69 5.612 3.69zm3.214-1.83a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" />
          </svg>
        );
      case 'react':
        return (
          <svg className="w-6 h-6" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        );
      case 'typescript':
        return (
          <div className="w-6 h-6 bg-black text-white font-mono font-bold text-xs flex items-center justify-center rounded-[2px]">
            TS
          </div>
        );
      case 'nodejs':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="12 2 21 7.5 21 16.5 12 22 3 16.5 3 7.5 12 2" />
            <text x="7.5" y="15" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none" fontFamily="monospace">JS</text>
          </svg>
        );
      case 'tailwind':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
          </svg>
        );
      case 'mongodb':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 8 8 8 13.5C8 17.09 10.91 20 14.5 20C17.09 20 19.26 18.47 19.8 16.29C19.93 15.75 20 15.13 20 14.5C20 8 12 2 12 2ZM12 18.5V4.5C14.5 8 18 11.5 18 14.5C18 16.43 16.43 18 14.5 18C13.57 18 12.72 17.63 12 17.03V18.5Z"/>
          </svg>
        );
      case 'git':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(45 12 12)" />
            <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
            <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
            <line x1="12" y1="8.5" x2="12" y2="15.5"/>
          </svg>
        );
      default:
        return <div className="w-6 h-6 bg-black text-white rounded-[2px] flex items-center justify-center font-bold text-xs">&lt;/&gt;</div>;
    }
  };

  return (
    <section id="habilidades" className="border-b-2 border-black bg-white flex flex-col md:flex-row items-stretch">
      {/* Etiqueta Izquierda: HABILIDADES */}
      <div className="bg-neo-purple text-white px-6 md:px-8 py-4 md:py-6 border-b-2 md:border-b-0 md:border-r-2 border-black flex items-center justify-between md:justify-start gap-4 min-w-[180px] md:min-w-[200px]">
        <div>
          <span className="font-extrabold text-lg md:text-xl tracking-wider uppercase block">
            HABILIDADES
          </span>
          <ArrowRight className="w-5 h-5 mt-1 stroke-[3]" />
        </div>
      </div>

      {/* Lista de Tecnologías */}
      <div className="flex-1 grid grid-cols-3 sm:grid-cols-6 divide-x-2 divide-y-2 sm:divide-y-0 divide-black">
        {portfolioData.skills.map((skill) => (
          <div
            key={skill.name}
            className="p-4 md:p-6 flex flex-col items-center justify-center gap-2.5 bg-white hover:bg-neo-cream transition-colors group cursor-default"
          >
            <div className="text-black group-hover:scale-110 transition-transform">
              {renderSkillIcon(skill.icon)}
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-black text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

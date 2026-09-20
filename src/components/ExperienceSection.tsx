import React from 'react';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface ExperienceSectionProps {
  onOpenResume?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
  return (
    <div id="experiencia" className="flex flex-col md:flex-row h-full bg-white">
      {/* Etiqueta Lateral Coral: EXPERIENCIA */}
      <div className="bg-neo-pink border-b-2 md:border-b-0 md:border-r-2 border-black p-6 md:p-8 flex md:flex-col justify-between items-start min-w-[170px] md:min-w-[200px]">
        <div>
          <span className="font-extrabold text-xl md:text-2xl tracking-tight uppercase block text-black">
            EXPERIENCIA
          </span>
          <ArrowRight className="w-5 h-5 mt-2 stroke-[3] text-black" />
        </div>
      </div>

      {/* Contenido de la Línea de Tiempo */}
      <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
        <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-black">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="relative">
              {/* Punto circular sólido en la línea */}
              <div className="absolute -left-[29px] md:-left-[37px] top-1 w-4 h-4 rounded-full bg-black border-2 border-white ring-2 ring-black"></div>

              {/* Título de Puesto y Empresa */}
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h3 className="font-black text-sm md:text-base uppercase tracking-tight text-black">
                  {exp.role} {exp.company && <>• <span className="text-gray-900">{exp.company}</span></>}
                </h3>
              </div>

              {/* Período */}
              <div className="font-mono text-xs font-bold text-gray-500 uppercase mb-2">
                {exp.period}
              </div>

              {/* Descripción */}
              <p className="font-mono text-xs md:text-sm text-gray-700 leading-relaxed max-w-xl">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Botón Ver CV Completo */}
        <div className="mt-8 pt-4">
          <a
            href={portfolioData.resumeUrl || '/cv.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            download="CV-Juan-Escudero.pdf"
            className="border-2 border-black px-4 py-2 text-xs font-mono font-bold uppercase bg-white shadow-neo neo-btn inline-flex items-center gap-2"
          >
            <span>VER CV COMPLETO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

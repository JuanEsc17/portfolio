import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectImageCarousel } from './ProjectImageCarousel';
import { portfolioData } from '../data/portfolioData';
import { Project } from '../types/portfolio';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
  onViewAllProjects: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject, onViewAllProjects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projects = portfolioData.projects;
  const currentProject = projects[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // Ilustración de arte estilo Weatherly fiel a la referencia
  const renderWeatherlyIllustration = () => (
    <div className="w-full h-44 sm:h-52 md:h-60 bg-[#ffeff2] border-2 border-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Sol de fondo con rayos estilo retro */}
      <div className="absolute top-2 left-6 sm:left-12 w-28 h-28 bg-[#FF8C00] rounded-full border-[3px] border-black flex items-center justify-center">
        <div className="w-full h-[3px] bg-black rotate-45"></div>
        <div className="w-full h-[3px] bg-black -rotate-45 absolute"></div>
      </div>

      {/* Nube celeste con bordes negros gruesos */}
      <div className="relative z-10 translate-y-2 translate-x-[-10px] sm:translate-x-[-20px]">
        <svg className="w-48 sm:w-56 h-auto drop-shadow-[3px_3px_0px_#000]" viewBox="0 0 160 100" fill="#66B3FF" stroke="#000000" strokeWidth="4" strokeLinejoin="round">
          <path d="M 30,70 A 25,25 0 0,1 60,40 A 35,35 0 0,1 120,45 A 25,25 0 0,1 145,70 A 15,15 0 0,1 130,85 L 35,85 A 15,15 0 0,1 30,70 Z" />
        </svg>
      </div>

      {/* Tarjeta de temperatura 24°C idéntica a la imagen */}
      <div className="absolute bottom-4 right-4 sm:right-8 z-20 bg-white border-[3px] border-black shadow-neo px-4 py-1.5 flex items-center">
        <span className="font-black text-3xl sm:text-4xl text-black tracking-tight font-sans">
          24°C
        </span>
      </div>
    </div>
  );

  // Ilustración para DevFlow
  const renderDevFlowIllustration = () => (
    <div className="w-full h-44 sm:h-52 md:h-60 bg-[#f0fdf4] border-2 border-black relative overflow-hidden flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white border-2 border-black shadow-neo p-4">
        <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-neo-pink border border-black"></div>
          <div className="w-3 h-3 rounded-full bg-neo-yellow border border-black"></div>
          <div className="w-3 h-3 rounded-full bg-neo-lime border border-black"></div>
          <span className="font-mono text-xs font-bold text-gray-700 ml-2">devflow-pipeline</span>
        </div>
        <div className="space-y-2">
          <div className="h-3.5 bg-neo-lime border border-black w-3/4"></div>
          <div className="h-3.5 bg-neo-purple border border-black w-1/2"></div>
          <div className="h-3.5 bg-neo-pink border border-black w-2/3"></div>
        </div>
      </div>
    </div>
  );

  // Ilustración para ShopEase
  const renderShopEaseIllustration = () => (
    <div className="w-full h-44 sm:h-52 md:h-60 bg-[#fffbeb] border-2 border-black relative overflow-hidden flex items-center justify-center p-6">
      <div className="relative bg-white border-2 border-black shadow-neo p-4 w-full max-w-sm flex items-center gap-4">
        <div className="w-16 h-16 bg-neo-yellow border-2 border-black flex items-center justify-center font-black text-2xl">
          🛍️
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-black w-3/4"></div>
          <div className="h-3 bg-neo-lime border border-black w-1/2"></div>
          <div className="font-mono text-xs font-bold text-neo-purple">$129.00 USD</div>
        </div>
      </div>
    </div>
  );

  const getIllustration = (id: string) => {
    switch (id) {
      case 'weatherly': return renderWeatherlyIllustration();
      case 'devflow': return renderDevFlowIllustration();
      default: return renderShopEaseIllustration();
    }
  };

  return (
    <div id="proyectos" className="p-6 md:p-8 lg:p-10 flex flex-col justify-between h-full bg-white">
      <div>
        {/* Cabecera de la sección de proyectos */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-extrabold text-xl md:text-2xl uppercase tracking-tight text-black">
            PROYECTOS DESTACADOS
          </h2>
          
          {/* Controles del carrusel < y > */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Proyecto anterior"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-neo-pink border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center font-bold text-sm"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Proyecto siguiente"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-neo-pink border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center font-bold text-sm"
            >
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Botón Ver Todos los Proyectos */}
        <div className="mb-6">
          <button 
            onClick={onViewAllProjects}
            className="border-2 border-black px-3.5 py-1 text-xs font-mono font-bold uppercase bg-white shadow-neo-sm neo-btn inline-flex items-center gap-1.5"
          >
            <span>VER TODOS LOS PROYECTOS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tarjeta del Proyecto Activo */}
        <div className="border-[3px] border-black p-4 sm:p-5 bg-white shadow-neo">
          {/* Carrusel de imágenes o ilustración del proyecto en marco rosa */}
          <div className="border-2 border-black p-2 bg-[#ff708f] mb-4">
            <ProjectImageCarousel
              images={currentProject.images}
              singleImage={currentProject.image}
              title={currentProject.title}
              fallbackIllustration={getIllustration(currentProject.id)}
              containerClassName="w-full h-44 sm:h-52 md:h-60"
            />
          </div>

          {/* Información del Proyecto */}
          <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tight text-black mb-2">
            {currentProject.title}
          </h3>

          <p className="font-mono text-xs sm:text-sm text-gray-800 leading-relaxed mb-4">
            {currentProject.description}
          </p>

          {/* Etiquetas de Tecnologías */}
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProject.tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-black px-2.5 py-1 text-xs font-mono font-bold bg-white shadow-neo-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Botón Ver Detalles */}
          <button
            onClick={() => onSelectProject(currentProject)}
            className="border-2 border-black px-4 py-2 text-xs font-mono font-bold uppercase bg-white shadow-neo neo-btn inline-flex items-center gap-2"
          >
            <span>VER DETALLES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Indicadores de paginación de carrusel: ○ ● ○ */}
      <div className="flex justify-center items-center gap-2.5 mt-6">
        {projects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir al proyecto ${idx + 1}`}
            className={`w-3 h-3 rounded-full border-2 border-black transition-all ${
              idx === currentIndex ? 'bg-black w-4' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

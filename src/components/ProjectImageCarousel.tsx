import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImageCarouselProps {
  images?: string[];
  singleImage?: string;
  title: string;
  fallbackIllustration?: React.ReactNode;
  containerClassName?: string;
}

export const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  images,
  singleImage,
  title,
  fallbackIllustration,
  containerClassName = "w-full h-48 sm:h-56 md:h-64",
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Normalizamos las imágenes recibidas
  const imageList = images && images.length > 0
    ? images
    : singleImage
      ? [singleImage]
      : [];

  // Si cambia el proyecto o la lista, reiniciamos el índice a 0
  useEffect(() => {
    setActiveIdx(0);
  }, [images, singleImage, title]);

  // Si no hay imágenes, mostramos la ilustración por defecto
  if (imageList.length === 0) {
    return <>{fallbackIllustration}</>;
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`relative bg-white border-2 border-black overflow-hidden select-none group ${containerClassName}`}>
      {/* Imagen Actual */}
      <img
        src={imageList[activeIdx]}
        alt={`${title} - Captura ${activeIdx + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Controles del Carrusel (solo si hay más de 1 imagen) */}
      {imageList.length > 1 && (
        <>
          {/* Flecha Izquierda */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 hover:bg-neo-lime border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center font-bold text-black z-10 transition-transform active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Flecha Derecha */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 hover:bg-neo-lime border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center font-bold text-black z-10 transition-transform active:scale-95"
          >
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Contador de imágenes (ej: 1 / 3) estilo retro */}
          <div className="absolute top-2.5 right-2.5 z-10 bg-black text-white font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 border border-white shadow-neo-sm">
            {activeIdx + 1} / {imageList.length}
          </div>

          {/* Puntos de navegación en la parte inferior */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white/90 px-2 py-1 border-2 border-black shadow-neo-sm">
            {imageList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(idx);
                }}
                aria-label={`Ver imagen ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full border border-black transition-all ${
                  idx === activeIdx ? 'bg-black w-3.5' : 'bg-white hover:bg-neo-pink'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

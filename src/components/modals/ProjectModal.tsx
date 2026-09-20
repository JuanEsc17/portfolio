import React from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { ProjectImageCarousel } from '../ProjectImageCarousel';
import { GithubIcon } from '../SocialIcons';
import { Project } from '../../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border-[3px] border-black shadow-neo-xl relative max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header estilo ventana retro */}
        <div className="bg-neo-pink border-b-[3px] border-black p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm uppercase tracking-wider text-black flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              PROYECTO: {project.title}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center font-bold text-sm"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {((project.images && project.images.length > 0) || project.image) && (
            <ProjectImageCarousel
              images={project.images}
              singleImage={project.image}
              title={project.title}
              containerClassName="w-full h-52 sm:h-72 shadow-neo-sm"
            />
          )}

          <div className="bg-neo-pink/10 border-2 border-black p-4">
            <h3 className="font-extrabold text-2xl uppercase tracking-tight mb-2">
              {project.title}
            </h3>
            <p className="font-mono text-sm text-gray-800 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-2 text-black">
              Tecnologías y Herramientas:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="border-2 border-black px-3 py-1 text-xs font-mono font-bold bg-neo-lime shadow-neo-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-black pt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-black bg-neo-purple text-white shadow-neo neo-btn inline-flex items-center gap-2"
                >
                  <span>Ver Demo En Vivo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-black bg-white shadow-neo neo-btn inline-flex items-center gap-2"
                >
                  <span>Ver Repositorio</span>
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-black bg-gray-100 shadow-neo neo-btn"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

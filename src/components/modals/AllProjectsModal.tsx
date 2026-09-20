import React from 'react';
import { X, ExternalLink, ArrowRight, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { portfolioData } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { sanitizeUrl } from '../../utils/security';

interface AllProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const AllProjectsModal: React.FC<AllProjectsModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  if (!isOpen) return null;

  const githubLink = portfolioData.socials.find(s => s.platform === 'github')?.url || 'https://github.com';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white border-[3px] border-black shadow-neo-xl relative max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header estilo ventana retro */}
        <div className="bg-neo-lime border-b-[3px] border-black p-3.5 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-black" />
            <span className="font-mono font-bold text-sm sm:text-base uppercase tracking-wider text-black">
              TODOS LOS PROYECTOS ({portfolioData.projects.length})
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

        {/* Contenido con listado / cuadrícula de todos los proyectos */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {portfolioData.projects.map((project) => {
              const coverImage = (project.images && project.images.length > 0) 
                ? project.images[0] 
                : project.image;

              return (
                <div 
                  key={project.id}
                  className="border-2 border-black bg-white shadow-neo-sm p-4 sm:p-5 flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo transition-all group"
                >
                  <div>
                    {/* Imagen de portada si existe */}
                    {coverImage && (
                      <div className="w-full h-36 border-2 border-black mb-3 overflow-hidden bg-neo-cream">
                        <img 
                          src={coverImage} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}

                    {/* Título */}
                    <h3 className="font-black text-lg uppercase tracking-tight text-black mb-1.5 flex items-center justify-between">
                      <span>{project.title}</span>
                    </h3>

                    {/* Descripción breve */}
                    <p className="font-mono text-xs text-gray-700 leading-relaxed mb-3">
                      {project.description}
                    </p>

                    {/* Etiquetas */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="border border-black px-2 py-0.5 text-[11px] font-mono font-bold bg-neo-cream shadow-[1px_1px_0px_#000]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProject(project);
                      }}
                      className="px-3 py-1.5 text-xs font-mono font-bold uppercase border-2 border-black bg-neo-lime shadow-neo-sm neo-btn inline-flex items-center gap-1.5"
                    >
                      <span>Ver Detalles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={sanitizeUrl(project.githubUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ver código en GitHub"
                          className="w-8 h-8 bg-white border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center hover:bg-gray-100"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={sanitizeUrl(project.liveUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ver demo en vivo"
                          className="w-8 h-8 bg-white border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center hover:bg-gray-100"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner inferior para explorar más en GitHub */}
          <div className="bg-neo-purple text-white border-2 border-black p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-neo">
            <div>
              <p className="font-bold text-sm uppercase">¿Quieres ver más proyectos y código?</p>
              <p className="font-mono text-xs text-purple-200">Visita mi perfil de GitHub con todos mis repositorios.</p>
            </div>
            <a
              href={sanitizeUrl(`${githubLink}?tab=repositories`)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-mono font-bold text-xs uppercase px-4 py-2 border-2 border-black shadow-neo-sm neo-btn inline-flex items-center gap-2 shrink-0"
            >
              <span>Ver en GitHub</span>
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Download, FileText, Briefcase, GraduationCap } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generación de descarga en texto o simulación de PDF
    const textContent = `CURRÍCULUM VITAE - ${portfolioData.brand}\n${portfolioData.title}\n\nRESUMEN:\n${portfolioData.subtitle}\n\nEXPERIENCIA:\n` +
      portfolioData.experience.map(e => `- ${e.role}${e.company ? ` en ${e.company}` : ''} (${e.period})\n  ${e.description}`).join('\n\n') +
      `\n\nHABILIDADES:\n` + portfolioData.skills.map(s => s.name).join(', ') +
      `\n\nCERTIFICACIONES:\n` + portfolioData.certifications.map(c => `- ${c.title} (${c.issuer}, ${c.date})`).join('\n');
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV-${portfolioData.brand.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white border-[3px] border-black shadow-neo-xl relative max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header estilo ventana retro */}
        <div className="bg-neo-lime border-b-[3px] border-black p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-black" />
            <span className="font-mono font-bold text-sm uppercase tracking-wider text-black">
              CURRÍCULUM VITAE
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
          <div className="border-b-2 border-black pb-4">
            <h2 className="text-3xl font-black uppercase tracking-tight">{portfolioData.brand}</h2>
            <p className="font-mono text-sm font-bold text-neo-purple mt-1">{portfolioData.title}</p>
            <p className="font-mono text-xs text-gray-700 mt-2">{portfolioData.subtitle}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg uppercase flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Experiencia Laboral</span>
            </h3>
            <div className="space-y-4">
              {portfolioData.experience.map((exp) => (
                <div key={exp.id} className="border-2 border-black p-3 bg-neo-cream shadow-neo-sm">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <span className="font-bold text-sm uppercase">{exp.role}</span>
                    <span className="font-mono text-xs text-gray-600">{exp.period}</span>
                  </div>
                  {exp.company && <div className="font-mono text-xs text-neo-purple font-bold mb-1">{exp.company}</div>}
                  <p className="font-mono text-xs text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg uppercase flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Certificaciones</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolioData.certifications.map((cert) => (
                <div key={cert.id} className="border-2 border-black p-3 bg-white shadow-neo-sm">
                  <div className="font-bold text-sm">{cert.title}</div>
                  <div className="font-mono text-xs text-gray-600">{cert.issuer} • {cert.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-black pt-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 font-mono text-xs font-bold uppercase border-2 border-black bg-white shadow-neo neo-btn"
            >
              Cerrar
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 font-mono text-xs font-bold uppercase border-2 border-black bg-neo-lime shadow-neo neo-btn flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Archivo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

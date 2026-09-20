import React, { useState } from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Certification } from '../types/portfolio';

export const Certifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <div id="certificaciones" className="bg-neo-lime p-6 md:p-8 flex flex-col justify-between h-full border-t-2 md:border-t-0 md:border-l-2 border-black">
      <div>
        {/* Título de la sección */}
        <h2 className="font-extrabold text-xl md:text-2xl uppercase tracking-tight text-black mb-6">
          CERTIFICACIONES
        </h2>

        {/* Tarjetas de Certificados estilo Cert 1, Cert 2, Cert 3 */}
        <div className="space-y-4">
          {portfolioData.certifications.map((cert, index) => (
            <div
              key={cert.id}
              onClick={() => setActiveCert(activeCert?.id === cert.id ? null : cert)}
              className="bg-[#E5E7EB] border-[3px] border-black shadow-neo p-5 sm:p-6 flex flex-col items-center justify-center cursor-pointer transition-transform hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-0.5 active:translate-y-0.5 group"
            >
              <div className="font-black text-2xl sm:text-3xl text-black uppercase tracking-tight group-hover:text-neo-purple transition-colors">
                Cert {index + 1}
              </div>
              
              {/* Información detallada al desplegar o pasar el mouse */}
              <div className="mt-2 text-center">
                <span className="font-mono text-xs font-bold text-gray-800 uppercase block">
                  {cert.title}
                </span>
                <span className="font-mono text-[11px] text-gray-600 block">
                  {cert.issuer} • {cert.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón Ver Todas las Certificaciones */}
      <div className="mt-6 pt-2">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white border-2 border-black shadow-neo-sm px-4 py-3 font-mono text-xs font-bold uppercase text-black neo-btn flex items-center justify-center gap-2 text-center"
        >
          <span>VER TODAS LAS CERTIFICACIONES</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Modal / Toast con información del certificado seleccionado */}
      {activeCert && (
        <div className="mt-4 p-3 bg-white border-2 border-black shadow-neo-sm font-mono text-xs animate-in fade-in">
          <div className="flex items-center gap-1.5 font-bold uppercase text-neo-purple mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>{activeCert.title}</span>
          </div>
          <p className="text-gray-700">{activeCert.description}</p>
        </div>
      )}
    </div>
  );
};

import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { sanitizeUrl } from '../utils/security';

interface HeroSectionProps {
  onOpenResume?: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return <GithubIcon className="w-4 h-4" />;
      case 'linkedin': return <LinkedinIcon className="w-4 h-4" />;
      case 'twitter': return <TwitterIcon className="w-4 h-4" />;
      case 'email': return <MailIcon className="w-4 h-4" />;
      default: return <MailIcon className="w-4 h-4" />;
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-black bg-white">
      {/* Columna Izquierda: Información Principal y Call-to-Actions */}
      <div className="lg:col-span-7 bg-grid-pattern p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-black">
        <div>
          {/* Badge Saludo */}
          <div className="inline-block mb-6">
            <span className="bg-neo-purple text-white text-xs md:text-sm font-mono font-bold px-3.5 py-1.5 border-2 border-black shadow-neo-sm uppercase inline-flex items-center gap-2">
              {portfolioData.greeting}
            </span>
          </div>

          {/* Título Principal Gigante */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-black mb-6">
            DESARROLLADOR <br />
            DE SOFTWARE
          </h1>

          {/* Subtítulo / Bio */}
          <p className="font-mono text-sm md:text-base text-gray-800 max-w-lg leading-relaxed mb-8">
            {portfolioData.subtitle}
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#proyectos"
              className="bg-neo-lime text-black font-mono font-bold text-xs md:text-sm px-6 py-3.5 border-2 border-black shadow-neo neo-btn uppercase inline-flex items-center gap-2"
            >
              <span>VER MI TRABAJO</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <a
              href={portfolioData.resumeUrl || '/cv.pdf'}
              download="CV-Juan-Escudero.pdf"
              className="bg-white text-black font-mono font-bold text-xs md:text-sm px-6 py-3.5 border-2 border-black shadow-neo neo-btn uppercase inline-flex items-center gap-2"
            >
              <span>DESCARGAR CV</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Sección "CONECTA CONMIGO" / Redes Sociales */}
        <div className="pt-4">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-black mb-3">
            CONECTA CONMIGO
          </p>
          <div className="flex items-center gap-3">
            {portfolioData.socials.map((social) => (
              <a
                key={social.platform}
                href={social.platform === 'email' ? '#contacto' : sanitizeUrl(social.url)}
                onClick={social.platform === 'email' ? (e) => { e.preventDefault(); onOpenContact(); } : undefined}
                target={social.platform === 'email' ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 bg-white border-2 border-black shadow-neo-sm neo-btn flex items-center justify-center text-black hover:bg-neo-lime transition-colors"
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Columna Derecha: Tarjeta Fotográfica con fondo coral y snippet de código superpuesto */}
      <div className="lg:col-span-5 bg-neo-pink p-8 sm:p-12 md:p-14 flex items-center justify-center relative min-h-[460px] lg:min-h-full overflow-hidden">
        <div className="relative w-full max-w-[320px] aspect-[4/5] flex items-center justify-center">
          {/* Capa de fondo decorativa verde lima desfasada */}
          <div className="absolute top-2 right-2 w-[85%] h-[85%] bg-neo-lime border-2 border-black translate-x-4 -translate-y-4"></div>

          {/* Tarjeta principal con la fotografía */}
          <div className="relative z-10 w-[85%] h-[85%] bg-white border-2 border-black shadow-neo overflow-hidden">
            <img 
              src={portfolioData.avatarUrl} 
              alt="Foto de perfil del desarrollador"
              className="w-full h-full object-cover grayscale-[15%] contrast-110"
              loading="lazy"
            />
          </div>

          {/* Insignia de Disponibilidad estilo Neo-brutalist con punto pulsante */}
          {portfolioData.statusBadge && (
            <div className="absolute -bottom-3 -right-2 sm:-right-4 z-20 bg-white border-2 border-black shadow-neo px-4 py-2.5 flex items-center gap-2.5 select-none">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-black"></span>
              </span>
              <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-black">
                {portfolioData.statusBadge.text}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

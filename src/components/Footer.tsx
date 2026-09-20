import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { sanitizeUrl } from '../utils/security';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
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
    <footer className="bg-white border-t-2 border-black flex flex-col sm:flex-row items-stretch justify-between">
      {/* Brand Tag en Verde Lima */}
      <a 
        href="#" 
        className="bg-neo-lime border-b-2 sm:border-b-0 sm:border-r-2 border-black px-4 md:px-6 py-3 flex items-center gap-2 font-mono font-bold text-xs sm:text-sm tracking-wider text-black hover:bg-[#b8eb25] transition-colors"
      >
        <span>&lt;/&gt;</span>
        <span>{portfolioData.brand}</span>
      </a>

      {/* Copyright en Monospace */}
      <div className="py-3 px-4 flex items-center justify-center text-center font-mono text-[11px] sm:text-xs text-gray-700">
        © {new Date().getFullYear()} {portfolioData.brand}. Todos los derechos reservados.
      </div>

      {/* Enlaces a Redes Sociales */}
      <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-black flex items-stretch divide-x-2 divide-black">
        {portfolioData.socials.map((social) => (
          <a
            key={social.platform}
            href={social.platform === 'email' ? '#contacto' : sanitizeUrl(social.url)}
            onClick={social.platform === 'email' ? (e) => { e.preventDefault(); onOpenContact(); } : undefined}
            target={social.platform === 'email' ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-11 sm:w-12 h-11 sm:h-12 flex items-center justify-center text-black hover:bg-neo-lime transition-colors"
          >
            {getSocialIcon(social.platform)}
          </a>
        ))}
      </div>
    </footer>
  );
};

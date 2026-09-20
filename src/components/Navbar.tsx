import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HABILIDADES', href: '#habilidades' },
    { label: 'PROYECTOS', href: '#proyectos' },
    { label: 'EXPERIENCIA', href: '#experiencia' },
    { label: 'CERTIFICACIONES', href: '#certificaciones' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-black">
      <div className="flex items-stretch justify-between h-14 md:h-16">
        {/* Brand Logo / Botón izquierdo estilo terminal */}
        <a 
          href="#"
          className="bg-neo-lime border-r-2 border-black px-4 md:px-6 flex items-center gap-2 font-mono font-bold text-sm md:text-base tracking-wider text-black hover:bg-[#b8eb25] transition-colors"
        >
          <span>&lt;/&gt;</span>
          <span>{portfolioData.brand}</span>
        </a>

        {/* Links de navegación para desktop */}
        <nav className="hidden md:flex items-center justify-center flex-1 space-x-6 lg:space-x-10 px-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs lg:text-sm font-bold tracking-wider text-black hover:text-neo-purple hover:underline underline-offset-4 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Botón derecho "CONTÁCTAME" / Contact Me */}
        <div className="flex items-stretch">
          <button
            onClick={onOpenContact}
            className="bg-neo-purple text-white border-l-2 border-black px-4 md:px-6 flex items-center gap-2 font-mono font-bold text-xs md:text-sm tracking-wider uppercase hover:bg-opacity-90 active:bg-opacity-100 transition-all group"
          >
            <span>CONTÁCTAME</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Botón de menú móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border-l-2 border-black px-3.5 bg-white flex items-center justify-center"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black bg-neo-cream p-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-mono text-sm font-bold p-2 border-2 border-black bg-white shadow-neo-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

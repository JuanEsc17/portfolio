import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white border-[3px] border-black shadow-neo-xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header de la ventana estilo retro */}
        <div className="bg-neo-lime border-b-[3px] border-black p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-black border border-black inline-block"></span>
            <span className="font-mono font-bold text-sm uppercase tracking-wider text-black">
              CONVERSEMOS_
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

        {/* Cuerpo del modal */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-neo-lime border-2 border-black shadow-neo">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>
              <h3 className="font-bold text-2xl uppercase">¡Mensaje Enviado!</h3>
              <p className="font-mono text-sm text-gray-700">
                Gracias por escribirme. Te responderé a la brevedad posible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1.5 text-black">
                  Nombre Completo *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Tu nombre..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-black p-3 font-mono text-sm shadow-neo-sm focus:outline-none focus:bg-neo-cream transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1.5 text-black">
                  Correo Electrónico *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-black p-3 font-mono text-sm shadow-neo-sm focus:outline-none focus:bg-neo-cream transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1.5 text-black">
                  Mensaje o Propuesta *
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-2 border-black p-3 font-mono text-sm shadow-neo-sm focus:outline-none focus:bg-neo-cream transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 font-mono text-xs font-bold uppercase border-2 border-black bg-white shadow-neo neo-btn"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-mono text-xs font-bold uppercase border-2 border-black bg-neo-purple text-white shadow-neo neo-btn flex items-center gap-2 hover:bg-opacity-95"
                >
                  <span>Enviar Mensaje</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

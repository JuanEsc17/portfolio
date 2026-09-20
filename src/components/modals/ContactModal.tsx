import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Loader2, AlertCircle, Clock } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { sanitizeText, isValidEmail, checkRateLimit, recordRateLimitAction } from '../../utils/security';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ACTION_KEY = 'contact_form';
const COOLDOWN_SECONDS = 60; // 1 minuto entre mensajes
const MAX_PER_HOUR = 5;      // Máximo 5 mensajes por hora
const MAX_MESSAGE_LENGTH = 1500;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 100;

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', _honey: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);

  // Inicializar y chequear rate limit al abrir el modal
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      const rl = checkRateLimit(ACTION_KEY, COOLDOWN_SECONDS, MAX_PER_HOUR);
      if (!rl.allowed) {
        if (rl.reason === 'cooldown') {
          setCooldownLeft(rl.remainingCooldown);
        } else if (rl.reason === 'hourly_limit') {
          setErrorMessage('Has alcanzado el límite de mensajes permitidos por hora (máximo 5). Por favor intenta más tarde.');
        }
      } else {
        setCooldownLeft(0);
      }
    }
  }, [isOpen]);

  // Temporizador para reducir el cooldown segundo a segundo
  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const timer = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownLeft]);

  if (!isOpen) return null;

  // Endpoint seguro: soporta VITE_FORMSUBMIT_TOKEN (hash anónimo) o email sanitizado
  const tokenOrEmail =
    import.meta.env.VITE_FORMSUBMIT_TOKEN ||
    import.meta.env.VITE_CONTACT_EMAIL ||
    portfolioData.socials
      .find((s) => s.platform === 'email')
      ?.url.replace('mailto:', '') ||
    'juanescudero074@gmail.com';

  const handleClose = () => {
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Detección de bots por Honeypot invisible
    if (formData._honey) {
      // Simular éxito silencioso para engañar a los bots de spam
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
        setFormData({ name: '', email: '', message: '', _honey: '' });
      }, 1500);
      return;
    }

    // 2. Control de Rate Limiting
    const rlCheck = checkRateLimit(ACTION_KEY, COOLDOWN_SECONDS, MAX_PER_HOUR);
    if (!rlCheck.allowed) {
      if (rlCheck.reason === 'cooldown') {
        setCooldownLeft(rlCheck.remainingCooldown);
        setErrorMessage(`Por seguridad, por favor espera ${rlCheck.remainingCooldown}s antes de enviar otro mensaje.`);
      } else {
        setErrorMessage('Has alcanzado el límite máximo de mensajes por hora. Por favor intenta más tarde o escríbeme directamente.');
      }
      return;
    }

    // 3. Sanitización y validación estricta de entradas
    const cleanName = sanitizeText(formData.name, MAX_NAME_LENGTH);
    const cleanEmail = formData.email.trim().slice(0, MAX_EMAIL_LENGTH);
    const cleanMessage = sanitizeText(formData.message, MAX_MESSAGE_LENGTH);

    if (cleanName.length < 2) {
      setErrorMessage('Por favor ingresa un nombre válido (mínimo 2 caracteres).');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage('Por favor ingresa un correo electrónico válido (ej: nombre@correo.com).');
      return;
    }

    if (cleanMessage.length < 10) {
      setErrorMessage('Por favor describe tu mensaje con más detalle (mínimo 10 caracteres).');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(tokenOrEmail)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          _subject: `Contacto Portfolio [Seguro]: ${cleanName}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || response.status === 200)) {
        recordRateLimitAction(ACTION_KEY);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', _honey: '' });
        setCooldownLeft(COOLDOWN_SECONDS);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 3000);
      } else {
        throw new Error(data.message || 'No se pudo enviar el mensaje.');
      }
    } catch (err: any) {
      setErrorMessage(
        err.message ||
          `Hubo un problema al enviar el mensaje. Por favor intenta de nuevo o escribe directamente a ${tokenOrEmail}.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white border-[3px] border-black shadow-neo-xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Header estilo retro */}
        <div className="bg-neo-lime border-b-[3px] border-black p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-black border border-black inline-block"></span>
            <span id="contact-modal-title" className="font-mono font-bold text-sm uppercase tracking-wider text-black">
              CONVERSEMOS_
            </span>
          </div>
          <button 
            onClick={handleClose}
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
              <h3 className="font-bold text-2xl uppercase">¡Mensaje Enviado con Éxito!</h3>
              <p className="font-mono text-sm text-gray-700">
                Gracias por escribirme. Tu mensaje ha sido transmitido de forma segura. Te responderé a la brevedad.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {errorMessage && (
                <div className="bg-neo-pink border-2 border-black p-3.5 text-xs font-mono font-bold text-black flex items-start gap-2 shadow-neo-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {cooldownLeft > 0 && (
                <div className="bg-neo-yellow border-2 border-black p-3 text-xs font-mono font-bold text-black flex items-center gap-2 shadow-neo-sm">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Espera {cooldownLeft}s antes de enviar otro mensaje para prevenir spam.</span>
                </div>
              )}

              {/* Honeypot anti-spam indetectable visualmente pero expuesto a bots */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  opacity: 0,
                  height: 0,
                  width: 0,
                  zIndex: -1,
                  pointerEvents: 'none',
                }}
              >
                <label htmlFor="company_website_honey">No llenes este campo si eres humano</label>
                <input
                  id="company_website_honey"
                  type="text"
                  name="_honey"
                  value={formData._honey}
                  onChange={(e) => setFormData({ ...formData, _honey: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="contact-name" className="block font-mono text-xs font-bold uppercase mb-1.5 text-black">
                  Nombre Completo * <span className="text-gray-500 font-normal">({formData.name.length}/{MAX_NAME_LENGTH})</span>
                </label>
                <input 
                  id="contact-name"
                  type="text" 
                  required
                  maxLength={MAX_NAME_LENGTH}
                  disabled={isLoading}
                  placeholder="Tu nombre..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-black p-3 font-mono text-sm shadow-neo-sm focus:outline-none focus:bg-neo-cream transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-mono text-xs font-bold uppercase mb-1.5 text-black">
                  Correo Electrónico *
                </label>
                <input 
                  id="contact-email"
                  type="email" 
                  required
                  maxLength={MAX_EMAIL_LENGTH}
                  disabled={isLoading}
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-black p-3 font-mono text-sm shadow-neo-sm focus:outline-none focus:bg-neo-cream transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="contact-message" className="font-mono text-xs font-bold uppercase text-black">
                    Mensaje o Propuesta *
                  </label>
                  <span className={`font-mono text-[11px] ${formData.message.length > MAX_MESSAGE_LENGTH - 50 ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <textarea 
                  id="contact-message"
                  required
                  rows={4}
                  maxLength={MAX_MESSAGE_LENGTH}
                  disabled={isLoading}
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-2 border-black p-3 font-mono text-sm shadow-neo-sm focus:outline-none focus:bg-neo-cream transition-colors resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-5 py-2.5 font-mono text-xs font-bold uppercase border-2 border-black bg-white shadow-neo neo-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading || cooldownLeft > 0}
                  className="px-6 py-2.5 font-mono text-xs font-bold uppercase border-2 border-black bg-neo-purple text-white shadow-neo neo-btn flex items-center gap-2 hover:bg-opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span>Enviando...</span>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : cooldownLeft > 0 ? (
                    <>
                      <span>Espera ({cooldownLeft}s)</span>
                      <Clock className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensaje</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

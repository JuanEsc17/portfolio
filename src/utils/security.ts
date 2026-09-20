/**
 * Security Utility Module
 * Proporciona validación, saneamiento contra inyecciones y rate limiting para el cliente.
 */

// Sanitiza cadenas de texto eliminando etiquetas HTML peligrosas, secuencias de escape y caracteres de control
export const sanitizeText = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') return '';

  return input
    // Remueve etiquetas HTML
    .replace(/<[^>]*>/g, '')
    // Remueve caracteres de control ASCII (excepto saltos de línea y tabulaciones)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Reemplaza múltiples espacios en blanco
    .trim()
    .slice(0, maxLength);
};

// Validador estricto de sintaxis de correo electrónico (RFC 5322 simplificado, seguro contra ReDoS)
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  const cleanEmail = email.trim();
  if (cleanEmail.length > 100 || cleanEmail.length < 5) return false;

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(cleanEmail);
};

// Sanea URLs para evitar ejecución de scripts con esquemas javascript:, data: o vbscript:
export const sanitizeUrl = (url: string | undefined): string => {
  if (!url || typeof url !== 'string') return '#';
  const trimmed = url.trim();

  // Permitir enlaces ancla internos y rutas relativas
  if (trimmed.startsWith('#') || trimmed.startsWith('/')) {
    return trimmed;
  }

  // Permitir únicamente esquemas seguros
  const safeProtocols = ['https://', 'http://', 'mailto:'];
  const hasSafeProtocol = safeProtocols.some((protocol) => trimmed.toLowerCase().startsWith(protocol));

  if (!hasSafeProtocol) {
    console.warn(`[Security Warning] Enlace con protocolo potencialmente no seguro bloqueado: ${trimmed}`);
    return '#';
  }

  return trimmed;
};

interface RateLimitResult {
  allowed: boolean;
  remainingCooldown: number;
  reason?: 'cooldown' | 'hourly_limit';
}

interface RateLimitStorage {
  lastAction: number;
  timestamps: number[];
}

const RATE_LIMIT_PREFIX = 'sec_rl_';

// Comprueba si el usuario tiene permiso para ejecutar una acción o si debe esperar
export const checkRateLimit = (
  actionKey: string,
  cooldownSeconds: number = 60,
  maxPerHour: number = 5
): RateLimitResult => {
  try {
    const rawData = localStorage.getItem(`${RATE_LIMIT_PREFIX}${actionKey}`);
    if (!rawData) {
      return { allowed: true, remainingCooldown: 0 };
    }

    const data: RateLimitStorage = JSON.parse(rawData);
    const now = Date.now();

    // 1. Validar tiempo de espera individual (cooldown)
    const elapsedSeconds = Math.floor((now - data.lastAction) / 1000);
    if (elapsedSeconds < cooldownSeconds) {
      return {
        allowed: false,
        remainingCooldown: cooldownSeconds - elapsedSeconds,
        reason: 'cooldown',
      };
    }

    // 2. Validar límite horario
    const oneHourAgo = now - 60 * 60 * 1000;
    const recentAttempts = (data.timestamps || []).filter((t) => t > oneHourAgo);

    if (recentAttempts.length >= maxPerHour) {
      return {
        allowed: false,
        remainingCooldown: 0,
        reason: 'hourly_limit',
      };
    }

    return { allowed: true, remainingCooldown: 0 };
  } catch {
    // Si localStorage no está disponible o falla el parseo, se permite la acción
    return { allowed: true, remainingCooldown: 0 };
  }
};

// Registra la ejecución de una acción para actualizar el contador de rate limiting
export const recordRateLimitAction = (actionKey: string): void => {
  try {
    const now = Date.now();
    const rawData = localStorage.getItem(`${RATE_LIMIT_PREFIX}${actionKey}`);
    let timestamps: number[] = [];

    if (rawData) {
      try {
        const data: RateLimitStorage = JSON.parse(rawData);
        const oneHourAgo = now - 60 * 60 * 1000;
        timestamps = (data.timestamps || []).filter((t) => t > oneHourAgo);
      } catch {
        timestamps = [];
      }
    }

    timestamps.push(now);

    const payload: RateLimitStorage = {
      lastAction: now,
      timestamps,
    };

    localStorage.setItem(`${RATE_LIMIT_PREFIX}${actionKey}`, JSON.stringify(payload));
  } catch {
    // Manejo silencioso en caso de bloqueo de cookies/storage del navegador
  }
};

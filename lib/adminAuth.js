import crypto from 'crypto';

const COOKIE_NAME = 'touristaa_admin_session';

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || 'development-only-secret';
}

function signature(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('hex');
}

export function createAdminToken() {
  const payload = `admin.${Date.now()}`;
  return `${payload}.${signature(payload)}`;
}

export function isAdminTokenValid(token) {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'admin') return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const expected = signature(payload);
  if (parts[2].length !== expected.length || !crypto.timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))) return false;
  const issuedAt = Number(parts[1]);
  return Number.isFinite(issuedAt) && Date.now() - issuedAt < 1000 * 60 * 60 * 24;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

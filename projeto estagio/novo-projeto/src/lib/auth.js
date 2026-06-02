const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const LEGACY_TOKEN_KEY = 'token';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function persistAuthTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
}

export function clearAuthStorage() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
}

export function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payload = parts[1];
    const padded = payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, '=');
    const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  const user = decodeJwt(getAccessToken());

  if (!user || !user.exp) return null;

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (user.exp < nowSeconds) return null;

  const id = user.id ?? user.userId;
  return { ...user, id };
}

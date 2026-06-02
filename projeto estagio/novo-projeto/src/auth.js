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
  const token = localStorage.getItem('token');
  const user = decodeJwt(token);

  // Se o token expirou ou está inválido, não considerar como logado.
  if (!user || !user.exp) return null;

  const nowSeconds = Math.floor(Date.now() / 1000);
  return user.exp && user.exp < nowSeconds ? null : user;
}

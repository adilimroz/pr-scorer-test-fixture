export interface UserSession {
  userId: string;
  email: string;
  token: string;
  expiresAt: number;
}

const SESSION_KEY = 'app_session';

export function validateSession(session: UserSession | null): boolean {
  if (!session) {
    return false;
  }

  if (!session.userId || !session.token) {
    return false;
  }

  if (session.expiresAt <= Date.now()) {
    return false;
  }

  return true;
}

export function getStoredSession(): UserSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as UserSession;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return validateSession(getStoredSession());
}

export function createSession(userId: string, email: string, ttlMs = 3600_000): UserSession {
  const session: UserSession = {
    userId,
    email,
    token: `tok_${userId}_${Date.now()}`,
    expiresAt: Date.now() + ttlMs,
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

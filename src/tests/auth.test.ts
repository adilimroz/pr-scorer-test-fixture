import { describe, expect, it } from 'vitest';
import { validateSession, type UserSession } from '../utils/auth';

function makeSession(overrides: Partial<UserSession> = {}): UserSession {
  return {
    userId: 'user-1',
    email: 'test@example.com',
    token: 'tok_valid',
    expiresAt: Date.now() + 60_000,
    ...overrides,
  };
}

describe('validateSession', () => {
  it('returns false for null session', () => {
    expect(validateSession(null)).toBe(false);
  });

  it('returns false when token is missing', () => {
    expect(validateSession(makeSession({ token: '' }))).toBe(false);
  });

  it('returns true for a valid non-expired session', () => {
    expect(validateSession(makeSession())).toBe(true);
  });

  // Note: expired session edge case intentionally untested for partial coverage
});

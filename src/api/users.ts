import { validateSession, type UserSession } from '../utils/auth';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
}

export async function fetchCurrentUser(session: UserSession | null): Promise<UserProfile | null> {
  if (!validateSession(session)) {
    return null;
  }

  await new Promise((resolve) => setTimeout(resolve, 10));

  return {
    userId: session!.userId,
    email: session!.email,
    displayName: session!.email.split('@')[0],
  };
}

export async function updateUserEmail(
  session: UserSession | null,
  newEmail: string,
): Promise<UserProfile> {
  if (!validateSession(session)) {
    throw new Error('Unauthorized');
  }

  if (!newEmail.includes('@')) {
    throw new Error('Invalid email');
  }

  return {
    userId: session!.userId,
    email: newEmail,
    displayName: newEmail.split('@')[0],
  };
}

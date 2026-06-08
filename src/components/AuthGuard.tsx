import type { ReactNode } from 'react';
import { isAuthenticated } from '../utils/auth';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({
  children,
  fallback = <p data-testid="auth-blocked">Please sign in to continue.</p>,
}: AuthGuardProps) {
  if (!isAuthenticated()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

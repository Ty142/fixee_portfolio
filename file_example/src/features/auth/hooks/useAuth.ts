/**
 * useAuth Hook
 * 
 * Custom hook to access authentication context.
 * Provides convenient access to auth state and methods throughout the application.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextType } from '@/types/auth.types';

/**
 * Hook to access authentication context
 * 
 * @returns Authentication context value with user state and auth methods
 * @throws Error if used outside of AuthProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth();
 *   
 *   if (!isAuthenticated) {
 *     return <LoginButton onClick={() => login(email, password)} />;
 *   }
 *   
 *   return <div>Welcome, {user?.fullName}!</div>;
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure your component is wrapped with <AuthProvider>.'
    );
  }

  return context;
}

export default useAuth;

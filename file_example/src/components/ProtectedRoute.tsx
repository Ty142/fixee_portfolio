/**
 * Protected Route Component
 * 
 * A route guard component that restricts access to authenticated users only.
 * Redirects unauthenticated users to the login page.
 */

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

// ============================================================================
// Loading Screen Component
// ============================================================================

/**
 * Simple loading screen displayed while checking authentication status
 */
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// ============================================================================
// Protected Route Props
// ============================================================================

interface ProtectedRouteProps {
  /**
   * Child components to render if user is authenticated
   */
  children: ReactNode;

  /**
   * Path to redirect to if user is not authenticated
   * @default "/login"
   */
  fallbackPath?: string;
}

// ============================================================================
// Protected Route Component
// ============================================================================

/**
 * Protected Route Component
 * 
 * Wraps routes that require authentication. Checks if user is authenticated
 * and either renders the children or redirects to the login page.
 * 
 * @example
 * ```tsx
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 * 
 * @example With custom fallback path
 * ```tsx
 * <Route
 *   path="/admin"
 *   element={
 *     <ProtectedRoute fallbackPath="/unauthorized">
 *       <AdminPanel />
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 */
export function ProtectedRoute({ children, fallbackPath = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading screen while checking authentication status
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  // User is authenticated - render children
  return <>{children}</>;
}

export default ProtectedRoute;

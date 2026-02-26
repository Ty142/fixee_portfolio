/**
 * Authentication Context
 * 
 * This context provides global authentication state and actions throughout the application.
 * It manages user data, authentication status, and provides methods for login, logout, etc.
 */

import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { toast } from 'sonner';
import {
  User,
  AuthContextType,
  RegisterRequest,
} from '@/types/auth.types';
import { authService } from '@/services/auth.service';
import {
  getAccessToken,
  setAccessToken,
  getUser,
  setUser,
  clearAuthData,
} from '@/utils/auth.utils';
import { handleApiError, logError } from '@/utils/error.utils';

// ============================================================================
// Context Creation
// ============================================================================

/**
 * Authentication Context
 * Provides authentication state and methods to all child components
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// Provider Props
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

// ============================================================================
// Auth Provider Component
// ============================================================================

/**
 * Authentication Provider Component
 * 
 * Wraps the application and provides authentication state and methods.
 * Automatically restores session on mount if valid token exists.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // State
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // Session Restoration on Mount
  // ============================================================================

  useEffect(() => {
    /**
     * Check for existing authentication data on app initialization
     * Restores user session if valid token and user data exist
     */
    const initializeAuth = async () => {
      try {
        const token = getAccessToken();
        const userData = getUser();

        if (token && userData) {
          // Valid auth data found - restore session
          setUserState(userData);
          setIsAuthenticated(true);
          
          if (import.meta.env.DEV) {
            console.log('[Auth] Session restored for user:', userData.email);
          }
        }
      } catch (err) {
        logError(err, 'Auth Initialization');
        // Clear potentially corrupted data
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ============================================================================
  // Login
  // ============================================================================

  /**
   * Login with email and password
   * 
   * @param email - User's email address
   * @param password - User's password
   */
  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Call login API
      const response = await authService.login(email, password);

      // Store access token
      setAccessToken(response.accessToken);

      // Store user data
      setUser(response.user);

      // Update state
      setUserState(response.user);
      setIsAuthenticated(true);

      // Show success message

      if (import.meta.env.DEV) {
        console.log('[Auth] Login successful:', response.user.email);
      }
    } catch (err) {
      logError(err, 'Login');
      const errorResult = handleApiError(err);
      setError(errorResult.message);
      throw err; // Re-throw for component to handle
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // Register
  // ============================================================================

  /**
   * Register a new user account
   * 
   * @param data - Registration data (email, password, fullName, phoneNumber)
   */
  const register = useCallback(async (data: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Call register API
      const response = await authService.register(data);

      // Show success message

      if (import.meta.env.DEV) {
        console.log('[Auth] Registration successful:', data.email);
      }
    } catch (err) {
      logError(err, 'Register');
      const errorResult = handleApiError(err);
      setError(errorResult.message);
      throw err; // Re-throw for component to handle
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // Logout
  // ============================================================================

  /**
   * Logout the current user
   * 
   * Calls the backend logout endpoint and clears all local auth data.
   * Even if the API call fails, local data is cleared for security.
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      // Call logout API to invalidate refresh token
      await authService.logout();

      if (import.meta.env.DEV) {
        console.log('[Auth] Logout successful');
      }
    } catch (err) {
      logError(err, 'Logout');
      // Continue with logout even if API call fails
    } finally {
      // Always clear local auth data
      clearAuthData();
      setUserState(null);
      setIsAuthenticated(false);
      setError(null);
      setIsLoading(false);

      toast.success('Logged out successfully');
    }
  }, []);

  // ============================================================================
  // Forgot Password
  // ============================================================================

  /**
   * Request password reset (sends OTP to email)
   * 
   * @param email - User's email address
   */
  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.forgotPassword(email);

      toast.success(response.message || 'OTP sent to your email');

      if (import.meta.env.DEV) {
        console.log('[Auth] Forgot password OTP sent to:', email);
      }
    } catch (err) {
      logError(err, 'Forgot Password');
      const errorResult = handleApiError(err);
      setError(errorResult.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // Verify OTP
  // ============================================================================

  /**
   * Verify OTP code for password reset
   * 
   * @param email - User's email address
   * @param otp - 6-digit OTP code
   * @returns Reset token for password reset
   */
  const verifyOtp = useCallback(async (email: string, otp: string): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.verifyOtp(email, otp);

      toast.success(response.message || 'OTP verified successfully');

      if (import.meta.env.DEV) {
        console.log('[Auth] OTP verified for:', email);
      }

      return response.resetToken;
    } catch (err) {
      logError(err, 'Verify OTP');
      const errorResult = handleApiError(err);
      setError(errorResult.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // Reset Password
  // ============================================================================

  /**
   * Reset password with reset token
   * 
   * @param token - Reset token from OTP verification
   * @param newPassword - New password to set
   */
  const resetPassword = useCallback(
    async (token: string, newPassword: string): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await authService.resetPassword(token, newPassword);

        toast.success(response.message || 'Password reset successful');

        if (import.meta.env.DEV) {
          console.log('[Auth] Password reset successful');
        }
      } catch (err) {
        logError(err, 'Reset Password');
        const errorResult = handleApiError(err);
        setError(errorResult.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ============================================================================
  // Change Password
  // ============================================================================

  /**
   * Change password for authenticated user
   * 
   * @param currentPassword - User's current password
   * @param newPassword - New password to set
   */
  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await authService.changePassword(currentPassword, newPassword);

        toast.success(response.message || 'Password changed successfully');

        if (import.meta.env.DEV) {
          console.log('[Auth] Password changed successfully');
        }
      } catch (err) {
        logError(err, 'Change Password');
        const errorResult = handleApiError(err);
        setError(errorResult.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: AuthContextType = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    register,
    logout,
    forgotPassword,
    verifyOtp,
    resetPassword,
    changePassword,
  };

  // ============================================================================
  // Render
  // ============================================================================

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

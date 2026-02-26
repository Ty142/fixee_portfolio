/**
 * Authentication Type Definitions
 * 
 * This file contains all TypeScript interfaces and types for the authentication system.
 * These types ensure type safety throughout the application and match the backend API structure.
 */

// ============================================================================
// Backend API Response Wrapper
// ============================================================================

/**
 * Standard API response wrapper from backend
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T | null;
  timestamp: string;
}

// ============================================================================
// User Types
// ============================================================================

/**
 * User role enumeration
 */
export type UserRole = 'user' | 'admin' | 'technician';

/**
 * User entity representing an authenticated user
 */
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// Authentication Request Types
// ============================================================================

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Registration request payload
 */
export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

/**
 * Forgot password request payload
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * OTP verification request payload
 */
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

/**
 * Reset password request payload
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

/**
 * Change password request payload (for authenticated users)
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ============================================================================
// Authentication Response Types
// ============================================================================

/**
 * Login response from backend
 */
export interface LoginResponse {
  user: User;
  accessToken: string;
  message: string;
}

/**
 * Registration response from backend
 */
export interface RegisterResponse {
  message: string;
}

/**
 * Token refresh response from backend
 */
export interface RefreshResponse {
  accessToken: string;
}

/**
 * Forgot password response from backend
 */
export interface ForgotPasswordResponse {
  message: string;
}

/**
 * OTP verification response from backend
 */
export interface VerifyOtpResponse {
  resetToken: string;
  message: string;
}

/**
 * Reset password response from backend
 */
export interface ResetPasswordResponse {
  message: string;
}

/**
 * Change password response from backend
 */
export interface ChangePasswordResponse {
  message: string;
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * API error response structure
 */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>; // Field-specific validation errors
  statusCode?: number;
}

/**
 * Validation error for a specific field
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Standardized error result from error handling utility
 */
export interface ErrorResult {
  message: string;
  type: 'validation' | 'network' | 'auth' | 'authorization' | 'server' | 'unknown';
  fieldErrors?: Record<string, string>;
}

// ============================================================================
// Auth Context Types
// ============================================================================

/**
 * Authentication state managed by AuthContext
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Authentication context value provided to components
 */
export interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<string>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

// ============================================================================
// Storage Keys
// ============================================================================

/**
 * LocalStorage keys for authentication data
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
} as const;

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if an object is a User
 */
export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'email' in obj &&
    'fullName' in obj &&
    'role' in obj &&
    typeof (obj as User).id === 'string' &&
    typeof (obj as User).email === 'string' &&
    typeof (obj as User).fullName === 'string' &&
    ['user', 'admin', 'technician'].includes((obj as User).role)
  );
}

/**
 * Type guard to check if an object is an ApiError
 */
export function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'message' in obj &&
    typeof (obj as ApiError).message === 'string'
  );
}

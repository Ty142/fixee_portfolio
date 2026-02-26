/**
 * Authentication Service
 * 
 * This service encapsulates all authentication-related API calls.
 * It provides a clean abstraction layer between the UI and the backend API.
 */

import axiosInstance from '@/lib/axios';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '@/types/auth.types';

/**
 * Authentication Service Class
 * 
 * Provides methods for all authentication operations:
 * - Login
 * - Registration
 * - Logout
 * - Token refresh
 * - Password reset flow (forgot, verify OTP, reset)
 * - Password change
 */
class AuthService {
  /**
   * Login with email and password
   * 
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with user data and access token
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    const payload: LoginRequest = { email, password };
    const response = await axiosInstance.post<ApiResponse<LoginResponse>>('/auth/login', payload);
    
    // Extract data from ApiResponse wrapper
    if (response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Login failed');
  }

  /**
   * Register a new user account
   * 
   * @param data - Registration data (email, password, fullName, phoneNumber)
   * @returns Promise with success message
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await axiosInstance.post<ApiResponse<RegisterResponse>>('/auth/register', data);
    
    // For register, backend might return the created user or just a message
    // Return a success response
    return {
      message: response.data.message || 'Registration successful',
    };
  }

  /**
   * Logout the current user
   * 
   * This will invalidate the refresh token on the server
   * and clear the HTTP-only cookie.
   * 
   * @returns Promise with success message
   */
  async logout(): Promise<void> {
    await axiosInstance.post<ApiResponse<null>>('/auth/logout');
  }

  /**
   * Refresh the access token using the refresh token
   * 
   * The refresh token is automatically sent via HTTP-only cookie.
   * This method is typically called by the Axios interceptor automatically.
   * 
   * @returns Promise with new access token
   */
  async refreshToken(): Promise<RefreshResponse> {
    const response = await axiosInstance.post<ApiResponse<RefreshResponse>>('/auth/refresh');
    
    if (response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'Token refresh failed');
  }

  /**
   * Request a password reset (sends OTP to email)
   * 
   * @param email - User's email address
   * @returns Promise with success message
   */
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const payload: ForgotPasswordRequest = { email };
    const response = await axiosInstance.post<ApiResponse<ForgotPasswordResponse>>(
      '/auth/forgot-password',
      payload
    );
    
    return {
      message: response.data.message || 'OTP sent to email',
    };
  }

  /**
   * Verify OTP code for password reset
   * 
   * @param email - User's email address
   * @param otp - 6-digit OTP code sent to email
   * @returns Promise with reset token and success message
   */
  async verifyOtp(email: string, otp: string): Promise<VerifyOtpResponse> {
    const payload: VerifyOtpRequest = { email, otp };
    const response = await axiosInstance.post<ApiResponse<VerifyOtpResponse>>('/auth/verify-otp', payload);
    
    if (response.data.data) {
      return response.data.data;
    }
    
    throw new Error(response.data.message || 'OTP verification failed');
  }

  /**
   * Reset password with reset token
   * 
   * @param token - Reset token from OTP verification
   * @param newPassword - New password to set
   * @returns Promise with success message
   */
  async resetPassword(token: string, newPassword: string): Promise<ResetPasswordResponse> {
    const payload: ResetPasswordRequest = { token, newPassword };
    const response = await axiosInstance.post<ApiResponse<ResetPasswordResponse>>(
      '/auth/reset-password',
      payload
    );
    
    return {
      message: response.data.message || 'Password reset successful',
    };
  }

  /**
   * Change password for authenticated user
   * 
   * Requires the user to be logged in (access token in header).
   * 
   * @param currentPassword - User's current password
   * @param newPassword - New password to set
   * @returns Promise with success message
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ChangePasswordResponse> {
    const payload: ChangePasswordRequest = { currentPassword, newPassword };
    const response = await axiosInstance.post<ApiResponse<ChangePasswordResponse>>(
      '/auth/change-password',
      payload
    );
    
    return {
      message: response.data.message || 'Password changed successfully',
    };
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export class for testing purposes
export default AuthService;

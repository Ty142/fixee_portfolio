/**
 * Authentication Utility Functions
 * 
 * This file contains utility functions for managing authentication data in localStorage.
 * These functions provide a clean abstraction for token and user data storage.
 */

import { User, STORAGE_KEYS, isUser } from '@/types/auth.types';

// ============================================================================
// Access Token Management
// ============================================================================

/**
 * Retrieve the access token from localStorage
 * @returns The access token string or null if not found
 */
export function getAccessToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error reading access token from localStorage:', error);
    return null;
  }
}

/**
 * Store the access token in localStorage
 * @param token - The JWT access token to store
 */
export function setAccessToken(token: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  } catch (error) {
    console.error('Error storing access token in localStorage:', error);
  }
}

/**
 * Remove the access token from localStorage
 */
export function removeAccessToken(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error removing access token from localStorage:', error);
  }
}

// ============================================================================
// User Data Management
// ============================================================================

/**
 * Retrieve the user data from localStorage
 * @returns The User object or null if not found or invalid
 */
export function getUser(): User | null {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) {
      return null;
    }

    const user = JSON.parse(userStr);
    
    // Validate the parsed object is a valid User
    if (!isUser(user)) {
      console.error('Invalid user data in localStorage');
      removeUser(); // Clean up invalid data
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error reading user data from localStorage:', error);
    removeUser(); // Clean up corrupted data
    return null;
  }
}

/**
 * Store the user data in localStorage
 * @param user - The User object to store
 */
export function setUser(user: User): void {
  try {
    const userStr = JSON.stringify(user);
    localStorage.setItem(STORAGE_KEYS.USER, userStr);
  } catch (error) {
    console.error('Error storing user data in localStorage:', error);
  }
}

/**
 * Remove the user data from localStorage
 */
export function removeUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error removing user data from localStorage:', error);
  }
}

// ============================================================================
// Complete Auth Data Management
// ============================================================================

/**
 * Clear all authentication data from localStorage
 * This should be called on logout or when authentication fails
 */
export function clearAuthData(): void {
  removeAccessToken();
  removeUser();
}

/**
 * Check if user is authenticated by verifying token and user data exist
 * @returns true if both access token and user data exist in localStorage
 */
export function hasAuthData(): boolean {
  const token = getAccessToken();
  const user = getUser();
  return token !== null && user !== null;
}

// ============================================================================
// Token Validation Helpers
// ============================================================================

/**
 * Check if a JWT token is expired (basic check without verification)
 * Note: This is a client-side check only. Server-side validation is required.
 * @param token - The JWT token to check
 * @returns true if token appears to be expired, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return true; // Invalid format
    }

    // Decode payload (base64url)
    const payload = JSON.parse(atob(parts[1]));
    
    if (!payload.exp) {
      return false; // No expiration claim
    }

    // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired on error
  }
}

/**
 * Get token expiration time
 * @param token - The JWT token
 * @returns Expiration timestamp in milliseconds, or null if not available
 */
export function getTokenExpiration(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1]));
    
    if (!payload.exp) {
      return null;
    }

    // Convert from seconds to milliseconds
    return payload.exp * 1000;
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
}

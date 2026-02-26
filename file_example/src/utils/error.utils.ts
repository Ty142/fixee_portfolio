/**
 * Error Handling Utilities
 * 
 * This file contains utility functions for handling and standardizing API errors.
 * It provides consistent error messages and structures for the UI layer.
 */

import axios, { AxiosError } from 'axios';
import { ApiError, ErrorResult } from '@/types/auth.types';

/**
 * Handle API errors and return a standardized error result
 * 
 * This function processes different types of errors (network, validation, auth, etc.)
 * and returns a consistent ErrorResult object for the UI to display.
 * 
 * @param error - The error object from an API call
 * @returns Standardized ErrorResult with message, type, and optional field errors
 */
export function handleApiError(error: unknown): ErrorResult {
  // Network error (no response from server)
  if (axios.isAxiosError(error) && !error.response) {
    return {
      message: 'Network error. Please check your connection.',
      type: 'network',
    };
  }

  // HTTP error response
  if (axios.isAxiosError(error) && error.response) {
    const { status, data } = error.response;

    // Validation errors (400 Bad Request with field-specific errors)
    if (status === 400 && data.errors) {
      const fieldErrors: Record<string, string> = {};
      
      // Convert array of error messages to single string per field
      Object.entries(data.errors).forEach(([field, messages]) => {
        if (Array.isArray(messages) && messages.length > 0) {
          fieldErrors[field] = messages[0]; // Take first error message
        } else if (typeof messages === 'string') {
          fieldErrors[field] = messages;
        }
      });

      return {
        message: data.message || 'Validation failed',
        type: 'validation',
        fieldErrors,
      };
    }

    // Authentication errors (401 Unauthorized)
    if (status === 401) {
      return {
        message: data.message || 'Authentication failed. Please login again.',
        type: 'auth',
      };
    }

    // Authorization errors (403 Forbidden)
    if (status === 403) {
      return {
        message: 'You do not have permission to perform this action.',
        type: 'authorization',
      };
    }

    // Server errors (500+)
    if (status >= 500) {
      return {
        message: 'Server error. Please try again later.',
        type: 'server',
      };
    }

    // Other HTTP errors
    return {
      message: data.message || 'An error occurred. Please try again.',
      type: 'unknown',
    };
  }

  // Unknown error type
  return {
    message: 'An unexpected error occurred.',
    type: 'unknown',
  };
}

/**
 * Extract error message from an error object
 * 
 * @param error - The error object
 * @returns The error message string
 */
export function getErrorMessage(error: unknown): string {
  const errorResult = handleApiError(error);
  return errorResult.message;
}

/**
 * Check if an error is a network error
 * 
 * @param error - The error object
 * @returns true if it's a network error
 */
export function isNetworkError(error: unknown): boolean {
  return axios.isAxiosError(error) && !error.response;
}

/**
 * Check if an error is an authentication error (401)
 * 
 * @param error - The error object
 * @returns true if it's a 401 error
 */
export function isAuthError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

/**
 * Check if an error is a validation error (400 with field errors)
 * 
 * @param error - The error object
 * @returns true if it's a validation error
 */
export function isValidationError(error: unknown): boolean {
  return (
    axios.isAxiosError(error) &&
    error.response?.status === 400 &&
    error.response?.data?.errors !== undefined
  );
}

/**
 * Extract field-specific errors from a validation error
 * 
 * @param error - The error object
 * @returns Record of field names to error messages, or empty object
 */
export function getFieldErrors(error: unknown): Record<string, string> {
  if (!isValidationError(error)) {
    return {};
  }

  const axiosError = error as AxiosError<ApiError>;
  const errors = axiosError.response?.data?.errors || {};
  const fieldErrors: Record<string, string> = {};

  Object.entries(errors).forEach(([field, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      fieldErrors[field] = messages[0];
    } else if (typeof messages === 'string') {
      fieldErrors[field] = messages;
    }
  });

  return fieldErrors;
}

/**
 * Log error details in development mode only
 * 
 * @param error - The error object
 * @param context - Optional context string for debugging
 */
export function logError(error: unknown, context?: string): void {
  // Only log in development mode
  if (import.meta.env.DEV) {
    const prefix = context ? `[${context}]` : '[Error]';
    
    if (axios.isAxiosError(error)) {
      console.error(prefix, {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    } else {
      console.error(prefix, error);
    }
  }
}

/**
 * Create a user-friendly error message based on error type
 * 
 * @param error - The error object
 * @param defaultMessage - Default message if error type is unknown
 * @returns User-friendly error message
 */
export function getUserFriendlyMessage(
  error: unknown,
  defaultMessage: string = 'Something went wrong. Please try again.'
): string {
  const errorResult = handleApiError(error);
  
  // Return specific message if available, otherwise use default
  return errorResult.message || defaultMessage;
}

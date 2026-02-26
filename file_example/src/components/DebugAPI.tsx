import { useState } from 'react';
import axiosInstance from '@/lib/axios';

export function DebugAPI() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult('Testing connection...');
    
    try {
      console.log('Testing API connection...');
      console.log('Base URL:', import.meta.env.VITE_API_URL);
      console.log('Full URL:', `${import.meta.env.VITE_API_URL}/auth/login`);
      
      const response = await axiosInstance.post('/auth/login', {
        email: 'test@example.com',
        password: 'test123'
      });
      
      setResult(JSON.stringify({
        success: true,
        status: response.status,
        data: response.data
      }, null, 2));
    } catch (error: any) {
      console.error('API Test Error:', error);
      setResult(JSON.stringify({
        success: false,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const testDirectFetch = async () => {
    setLoading(true);
    setResult('Testing with direct fetch...');
    
    try {
      const url = 'http://localhost:8080/api/v1/auth/login';
      console.log('Testing direct fetch to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'test123'
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      setResult(JSON.stringify({
        success: true,
        status: response.status,
        data: data
      }, null, 2));
    } catch (error: any) {
      console.error('Direct Fetch Error:', error);
      setResult(JSON.stringify({
        success: false,
        message: error.message,
        stack: error.stack
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md z-50">
      <h3 className="font-bold mb-2">API Debug</h3>
      <div className="space-y-2">
        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Axios Connection
        </button>
        <button
          onClick={testDirectFetch}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Direct Fetch
        </button>
      </div>
      {result && (
        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-64">
          {result}
        </pre>
      )}
      <div className="mt-2 text-xs text-gray-600">
        <p>VITE_API_URL: {import.meta.env.VITE_API_URL || 'not set'}</p>
        <p>Mode: {import.meta.env.MODE}</p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '@/contexts';

interface LoginData {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (data: LoginData) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginReturn {
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await authLogin(data.email, data.password);
      
      if (!success) {
        setError('Invalid email or password');
        return false;
      }

      return true;
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error
  };
}
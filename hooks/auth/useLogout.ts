import { useAuth } from '@/contexts';
import { useNavigationWithLoading } from '@/lib/utils/navigation';

interface UseLogoutReturn {
  logout: () => void;
}

export function useLogout(): UseLogoutReturn {
  const { logout: authLogout } = useAuth();
  const { navigate } = useNavigationWithLoading();

  const logout = () => {
    authLogout();
    navigate('/auth/login');
  };

  return {
    logout
  };
}
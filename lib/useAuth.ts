import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from './utils';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const checkAuth = () => {
      const token = getToken();
      if (!token) {
        router.replace('/');
      }
    };

    // Check immediately
    checkAuth();

    // Set up interval to check periodically
    const interval = setInterval(checkAuth, 1000); // Check every second

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [router]);
}

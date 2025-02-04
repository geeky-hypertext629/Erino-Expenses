const API_URL = 'https://erino-expenses2-ogxomj0rr-geekyhypertext629s-projects.vercel.app/api/v1';

export const checkAuthStatus = async () => {
    const response = await fetch(`${API_URL}/auth-status`, {
      credentials: 'include', 
    });
  
    if (!response) {
      throw new Error('Auth check failed');
    }
  
    return response.json();
 };
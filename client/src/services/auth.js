const API_URL = 'http://localhost:3000/api/v1';

export const checkAuthStatus = async () => {
    const response = await fetch(`${API_URL}/auth-status`, {
      credentials: 'include', 
    });
  
    if (!response) {
      throw new Error('Auth check failed');
    }
  
    return response.json();
 };
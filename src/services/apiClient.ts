import { useAuthStore } from '../stores/authStore';

// URL API mẫu hoặc mock backend
const BASE_URL = 'https://67500d4169dc1669ec19e73b.mockapi.io/api/v1';

export const apiClient = {
  get: async (endpoint: string) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      throw new Error(`API GET Error: ${response.statusText}`);
    }
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API POST Error: ${response.statusText}`);
    }
    return response.json();
  },
};

export default apiClient;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // Assuming the response contains the token
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

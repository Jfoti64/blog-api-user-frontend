// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    throw error;
  }
};

export const fetchBlogById = async (id) => {
  if (!id) {
    throw new Error('Blog ID is required');
  }
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch blog with id ${id}:`, error);
    throw error;
  }
};

export const addComment = async (blogId, comment) => {
  try {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const response = await fetch(`${API_BASE_URL}/posts/${blogId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to add comment to blog with id ${blogId}:`, error);
    throw error;
  }
};

export const signup = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to sign up:', error);
    throw error;
  }
};

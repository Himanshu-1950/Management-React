import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', response.data.access);
          // Retry the original request
          error.config.headers.Authorization = `Bearer ${response.data.access}`;
          return api.request(error.config);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login'; // Assuming you have a login page
        }
      }
    }
    return Promise.reject(error);
  }
);

const apiService = {
  login: async (username, password) => {
    const response = await api.post('/token/', { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getTasks: async () => {
    const response = await api.get('/tasks/');
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks/', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}/`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}/`);
  },

  getNotifications: async () => {
    const response = await api.get('/notifications/');
    return response.data;
  },

  markNotificationRead: async (id) => {
    await api.patch(`/notifications/${id}/mark_read/`);
  },

  markAllNotificationsRead: async () => {
    await api.patch('/notifications/mark_all_read/');
  },

  deleteNotification: async (id) => {
    await api.delete(`/notifications/${id}/`);
  },
};

export default apiService;

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Only log essential error info in production, or use a proper logging service
    if (process.env.NODE_ENV === 'development') {
      console.error("API Error:", error.response?.status, error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export const notesAPI = {
  getAll: (filters = {}) => api.get("/notes", { params: filters }),
  getById: (id) => api.get(`/notes/${id}`),
  create: (data) => {
    console.log("Creating note with data:", data);
    return api.post("/notes", data);
  },
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
  togglePin: (id) => api.patch(`/notes/${id}/toggle-pin`),
  toggleArchive: (id) => api.patch(`/notes/${id}/toggle-archive`),
  getStats: () => api.get("/notes/stats/summary"),
  deleteMultiple: (ids) => api.post("/notes/bulk-delete", { ids }),
};

export default api;

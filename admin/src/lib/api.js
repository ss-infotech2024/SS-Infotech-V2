import axios from "axios";

const DEFAULT_API_BASE_URL = "https://sswebsitebackend.ssinfotech.co.in";

const configuredApiBaseUrl = String(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
).replace(/\/+$/, "");

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/api$/i, "");

export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

export function apiAuthHeaders(extra = {}) {
  const headers = { ...extra };
  const token = import.meta.env.VITE_ADMIN_TOKEN;
  if (token) headers["x-admin-token"] = token;
  return headers;
}

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_ADMIN_TOKEN;
  if (token) {
    config.headers = config.headers || {};
    config.headers["x-admin-token"] = token;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("isAdminLoggedIn");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  },
);

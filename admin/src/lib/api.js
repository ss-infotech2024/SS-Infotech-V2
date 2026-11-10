import axios from "axios";

const DEFAULT_API_BASE_URL = "https://ss-infotech-v2-2.onrender.com/";

const configuredApiBaseUrl = String(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
).replace(/\/+$/, "");

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/api$/i, "");

export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

const ADMIN_API_TOKEN =
  import.meta.env.VITE_ADMIN_TOKEN || "i4oTayXOPrLmdMaaBhYbIdeowhIZRRQa";

export function adminToken() {
  return sessionStorage.getItem("adminApiToken") || ADMIN_API_TOKEN;
}

export function apiAuthHeaders(extra = {}) {
  return { ...extra, "x-admin-token": adminToken() };
}

axios.defaults.baseURL = API_BASE_URL;

axios.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers["x-admin-token"] = adminToken();
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // No response at all means the network or server is unreachable. One shared toast
    // (fixed id) covers every failing request, so nothing stacks up.
    if (!error.response && !axios.isCancel(error) && error.code !== "ERR_CANCELED") {
      import("../components/ui/toast.jsx").then(({ toast }) => {
        toast.error(error.code === "ECONNABORTED" ? "The server is taking too long to respond" : "Can't reach the server", {
          id: "network-error",
          description: "Check your internet connection and try again.",
        });
      });
    }
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("isAdminLoggedIn");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  },
);

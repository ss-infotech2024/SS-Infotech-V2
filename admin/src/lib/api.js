import axios from "axios";

// Admin API requests stay same-origin so the Vite/Vercel server proxy can
// attach server-side credentials without placing them in the browser bundle.
axios.defaults.baseURL = "/";

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

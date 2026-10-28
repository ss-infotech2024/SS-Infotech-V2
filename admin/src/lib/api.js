import axios from "axios";

// Admin is served as static files (cPanel), so relative "/api/..." calls
// must be sent straight to the backend instead of a same-origin proxy.
export const API_BASE_URL = String(
  import.meta.env.VITE_API_BASE_URL || "https://sswebsitebackend.ssinfotech.co.in",
).replace(/\/$/, "");

const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

axios.defaults.baseURL = API_BASE_URL;
if (ADMIN_TOKEN) {
  axios.defaults.headers.common["x-admin-token"] = ADMIN_TOKEN;
}

const nativeFetch = window.fetch.bind(window);
window.fetch = (input, init = {}) => {
  if (typeof input === "string" && input.startsWith("/api/")) {
    const headers = new Headers(init.headers);
    if (ADMIN_TOKEN) headers.set("x-admin-token", ADMIN_TOKEN);
    return nativeFetch(`${API_BASE_URL}${input}`, { ...init, headers });
  }
  return nativeFetch(input, init);
};

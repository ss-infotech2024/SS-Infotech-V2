const DEFAULT_API_BASE_URL = "https://sswebsitebackend.ssinfotech.co.in";

export const API_BASE_URL = String(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
).replace(/\/$/, "");

export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

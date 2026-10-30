const DEFAULT_API_BASE_URL = "https://sswebsitebackend.ssinfotech.co.in";

const configuredApiBaseUrl = String(
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
).replace(/\/+$/, "");

// Keep the configured value flexible: both the API host and host + /api are
// accepted, while apiUrl always adds the /api route exactly once.
export const API_BASE_URL = configuredApiBaseUrl.replace(/\/api$/i, "");

export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

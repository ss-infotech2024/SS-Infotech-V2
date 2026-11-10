import { apiAuthHeaders, apiUrl } from "./api";

/** Ends the admin session (same steps as before the redesign). */
export async function logout(navigate) {
  try {
    await fetch(apiUrl("/api/admin/logout"), { method: "POST", headers: apiAuthHeaders() });
  } catch (error) {
    console.error("Admin logout failed:", error);
  } finally {
    localStorage.removeItem("isAdminLoggedIn");
    sessionStorage.removeItem("adminApiToken");
    navigate("/login");
  }
}

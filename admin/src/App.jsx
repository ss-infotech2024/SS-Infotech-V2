import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AdminSlides from "./pages/AdminSlides";
import AdminJobs from "./pages/AdminJobs";
import AdminGallery from "./pages/AdminGallery";
import AdminCertificate from "./GenerateCertificate";
import AdminApplications from "./pages/AdminApplications";
import CandidateManager from "./pages/CandidateManager";
import CertificateLogs from "./pages/CertificateLogs";
import AppShell from "./components/layout/AppShell";

const protectedRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/hero-banner", element: <AdminSlides /> },
  { path: "/job-listings", element: <AdminJobs /> },
  { path: "/job-applications", element: <AdminApplications /> },
  { path: "/gallery", element: <AdminGallery /> },
  { path: "/certificates", element: <AdminCertificate /> },
  { path: "/certificate-logs", element: <CertificateLogs /> },
  { path: "/candidate-excel", element: <CandidateManager /> },
];

function AppContent() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const routes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      {protectedRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<ProtectedRoute>{route.element}</ProtectedRoute>} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  // The login page stands alone; every signed-in page lives inside the app shell.
  if (location.pathname === "/login" || !isLoggedIn) return routes;
  return <AppShell>{routes}</AppShell>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

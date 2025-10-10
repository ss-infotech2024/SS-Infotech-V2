
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";


import AdminSlides from "./pages/AdminSlides";
import AdminJobs from "./pages/AdminJobs";
import AdminGallery from "./pages/AdminGallery";
import AdminCertificate from "./GenerateCertificate";
import AdminApplications from "./pages/AdminApplications";

function AppContent() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  // Hide Navbar on login page
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && isLoggedIn && <Navbar />}

      {/* Add padding only if Navbar is visible */}
      <div className={!hideNavbar && isLoggedIn ? "pt-20" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hero-banner"
            element={
              <ProtectedRoute>
                <AdminSlides />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-listings"
            element={
              <ProtectedRoute>
                <AdminJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <AdminCertificate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job-applications"
            element={
              <ProtectedRoute>
                <AdminApplications />
              </ProtectedRoute>
            }
          />

            {/* <Route
            path="/candidate-manager"
            element={
              <ProtectedRoute>
                <CandidateManager />
              </ProtectedRoute>
            }
          /> */}
=
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


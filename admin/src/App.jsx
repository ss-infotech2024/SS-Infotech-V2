import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import AdminApplications from "./pages/AdminApplications";
import CandidateManager from "./pages/CandidateManager";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar is fixed at the top */}
      <div className="pt-20"> {/* Add padding top to avoid content hiding behind the navbar */}
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Protected Dashboard Route */}
          <Route
            path="/job-applications"
            element={
              <ProtectedRoute>
                <AdminApplications />
              </ProtectedRoute>
            }
          />
            <Route
            path="/candidate-manager"
            element={
              <ProtectedRoute>
                <CandidateManager />
              </ProtectedRoute>
            }
          />
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

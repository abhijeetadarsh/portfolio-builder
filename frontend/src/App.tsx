// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PortfoliosPage from "./pages/portfolios/PortfoliosPage";
import PortfolioCreatePage from "./pages/portfolios/PortfolioCreatePage";
import PortfolioEditPage from "./pages/portfolios/PortfolioEditPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectCreatePage from "./pages/projects/ProjectCreatePage";
import ProjectEditPage from "./pages/projects/ProjectEditPage";
import CertificatesPage from "./pages/certificates/CertificatesPage";
import CertificateCreatePage from "./pages/certificates/CertificateCreatePage";
import CertificateEditPage from "./pages/certificates/CertificateEditPage";
import ProfilePage from "./pages/profile/ProfilePage";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/portfolios"
              element={
                <ProtectedRoute>
                  <PortfoliosPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/portfolios/create"
              element={
                <ProtectedRoute>
                  <PortfolioCreatePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/portfolios/:id"
              element={
                <ProtectedRoute>
                  <PortfolioEditPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/projects/create"
              element={
                <ProtectedRoute>
                  <ProjectCreatePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/projects/:id"
              element={
                <ProtectedRoute>
                  <ProjectEditPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificates"
              element={
                <ProtectedRoute>
                  <CertificatesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificates/create"
              element={
                <ProtectedRoute>
                  <CertificateCreatePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificates/:id"
              element={
                <ProtectedRoute>
                  <CertificateEditPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

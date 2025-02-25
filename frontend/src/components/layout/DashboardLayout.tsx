// src/components/layout/DashboardLayout.tsx
import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "home" },
    { label: "Portfolios", path: "/portfolios", icon: "layout" },
    { label: "Projects", path: "/projects", icon: "file-text" },
    { label: "Certificates", path: "/certificates", icon: "award" },
    { label: "Profile", path: "/profile", icon: "user" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">
            Auro Portfolio
          </h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`flex items-center px-6 py-3 cursor-pointer ${
                location.pathname === item.path
                  ? "bg-primary-50 text-primary-600 border-r-4 border-primary-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => navigate(item.path)}
            >
              <i className={`mr-3 feather-${item.icon}`}></i>
              <span>{item.label}</span>
            </div>
          ))}
          <div
            className="flex items-center px-6 py-3 cursor-pointer text-gray-600 hover:bg-gray-50 mt-auto"
            onClick={logout}
          >
            <i className="mr-3 feather-log-out"></i>
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <div className="flex items-center">
              <div className="mr-4 text-sm text-gray-600">{user?.name}</div>
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { Package, History, LogOut, Menu as MenuIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { logoutUser } from "@/services/authService";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

const navigationItems = [
  { title: "Products", url: "/inventory", icon: Package },
  { title: "Stock History", url: "/stockHistory", icon: History },
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.status === 200) {
        dispatch(logout());
        toast.success("logout successfull");
      }
    } catch (error) {
      toast.error("error in logging out");
    }
  };

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-40 lg:static top-0 left-0 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 border-b flex items-center gap-3">
          <Package className="text-emerald-600" />
          <span className="text-lg font-semibold">Inventory</span>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-emerald-50 ${
                isActive(item.url)
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}

          <div className="border-t pt-4 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon />
          </Button>
          <h2 className="text-lg font-semibold my-1">Inventory Management</h2>
        </header>

        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

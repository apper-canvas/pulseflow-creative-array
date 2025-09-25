import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Sidebar from "./Sidebar";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from "../../App";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile header */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  PulseFlow CRM
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                  Logout
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                >
                  <ApperIcon name="Menu" className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop header with logout button */}
          <div className="hidden lg:block bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-end">
              <div className="flex items-center space-x-4">
                {user && (
                  <span className="text-sm text-gray-600">
                    Welcome, {user.firstName || user.emailAddress}
                  </span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          )}

          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>
    </div>
  );
};

export default Layout;
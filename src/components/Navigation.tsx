import React from 'react';
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import euLogo from "@/assets/eu-logo.png";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Über uns" },
    { to: "/events", label: "Events finden" },
    { to: "/event-input", label: "Events teilen" },
    { to: "/mitwirken", label: "Mitwirken" },
    { to: "/dialog", label: "Dialog" },
  ];

  return (
    <div className="bg-background">
      {/* Navigation Tabs */}
      <nav className="bg-background py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center space-x-12">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    isActive
                      ? "text-primary"
                      : "text-black"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="text-white py-4 rounded-3xl mx-8 mb-8 relative overflow-hidden" style={{ backgroundColor: '#0F2D49', aspectRatio: '1 / 0.213' }}>
        <div className="w-full px-6 relative z-10 h-full">
          <div className="flex items-start justify-between h-full">
            <div className="flex items-start h-full pt-2 pl-4">
              <h1 className="text-6xl font-bold text-white leading-tight">Event Netz Europa</h1>
            </div>
            
            {/* EU Logo */}
            <div className="relative flex items-start h-full pt-2 pr-4">
              <img 
                src={euLogo} 
                alt="EU Logo with documents and stars" 
                className="w-56 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Navigation;
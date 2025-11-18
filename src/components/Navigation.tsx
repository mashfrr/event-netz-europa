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
      <nav className="bg-background py-4 md:py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 lg:gap-12">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "text-sm md:text-base lg:text-lg font-medium transition-colors hover:text-primary whitespace-nowrap",
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
      <div 
        className="text-white py-3 md:py-4 lg:py-6 rounded-2xl md:rounded-3xl mx-4 md:mx-8 mb-6 md:mb-8 relative overflow-hidden hero-banner-mobile min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]" 
        style={{ 
          backgroundColor: '#0F2D49'
        }}
      >
        <div className="w-full px-3 md:px-6 relative z-10 h-full">
          <div className="flex items-start justify-between h-full flex-row">
            {/* Title - Left aligned */}
            <div className="flex items-start h-full pt-2 md:pt-4 pl-2 md:pl-4 pb-3 md:pb-4 lg:pb-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">Event Netz Europa</h1>
            </div>
            
            {/* EU Logo - Right side */}
            <div className="relative flex items-center justify-end h-full pr-2 md:pr-4">
              <div className="flex items-center justify-center pt-3 md:pt-4 pb-3 md:pb-4 lg:pb-6">
                <img 
                  src={euLogo} 
                  alt="EU Logo with documents and stars" 
                  className="w-16 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto max-w-full object-contain"
                  style={{ maxHeight: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Navigation;
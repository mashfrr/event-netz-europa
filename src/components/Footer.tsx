import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6">
          <Link to="/impressum">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-[#0F2D49] focus:outline-none focus:ring-0 hover:bg-transparent text-sm sm:text-base"
            >
              Impressum
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            onClick={() => window.open("https://www.vernetzte-gesellschaft.org/datenschutz", "_blank")}
            className="text-muted-foreground hover:text-[#0F2D49] focus:outline-none focus:ring-0 hover:bg-transparent text-sm sm:text-base"
          >
            Datenschutz
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.open("https://www.instagram.com/eventnetz_europa/?hl=de", "_blank")}
            className="text-muted-foreground hover:text-[#0F2D49] focus:outline-none focus:ring-0 hover:bg-transparent p-2"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.open("https://www.linkedin.com/showcase/event-netz-europa/about/", "_blank")}
            className="text-muted-foreground hover:text-[#0F2D49] focus:outline-none focus:ring-0 hover:bg-transparent p-2"
            aria-label="LinkedIn"
          >
            {/* Classic LinkedIn brand icon (square) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="h-5 w-5"
              aria-hidden="true"
              focusable="false"
              fill="currentColor"
            >
              <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.28 108 0 83.53 0 53.64 0 24.25 24.69 0 53.52 0s53.51 24.25 53.51 53.64c0 29.89-24.28 54.36-53.19 54.36zM447.9 448h-92.68V302.4c0-34.7-.69-79.23-48.29-79.23-48.29 0-55.69 37.73-55.69 76.73V448h-92.78V148.9h89.08v40.8h1.28c12.4-23.5 42.69-48.29 87.88-48.29 94 0 111.28 61.89 111.28 142.3V448z"/>
            </svg>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
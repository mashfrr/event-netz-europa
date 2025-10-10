import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-center space-x-6">
          <Link to="/impressum">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-[#0F2D49] focus:outline-none focus:ring-0 hover:bg-transparent"
            >
              Impressum
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            onClick={() => window.open("https://www.vernetzte-gesellschaft.org/datenschutz", "_blank")}
            className="text-muted-foreground hover:text-[#0F2D49] focus:outline-none focus:ring-0 hover:bg-transparent"
          >
            Datenschutz
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
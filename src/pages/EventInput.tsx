import React from 'react';
import { Button } from "@/components/ui/button";

const EventInput = () => {
  const handleEventButtonClick = () => {
    window.open("https://wkf.ms/46tvHJg", "_blank");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Teile dein Event mit der Community
          </h1>
          
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed space-y-3 sm:space-y-4">
            <p className="max-w-none">
              Kennst du ein spannendes Event, das für die Community interessant wäre, aber noch nicht veröffentlicht wurde?
            </p>
            <p className="max-w-none">
              Fülle einfach das Formular aus – es wird direkt an unser Team weitergeleitet und nach einer kurzen Prüfung veröffentlicht.
            </p>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleEventButtonClick}
              style={{ backgroundColor: '#41919C' }}
              className="text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-colors"
            >
              Event teilen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInput;
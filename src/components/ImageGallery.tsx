import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  const previewImages = images.slice(0, 3);
  const remainingCount = images.length - 3;

  return (
    <>
      {/* Image Preview Grid */}
      <div className="mb-8">
        <div className="flex gap-2 h-64">
          {/* Large first image */}
          <div
            className="flex-1 relative cursor-pointer rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity"
            onClick={() => openGallery(0)}
          >
            <img
              src={previewImages[0]}
              alt={`${title} Bild 1`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Two smaller images on the right */}
          {previewImages.length > 1 && (
            <div className="flex flex-col gap-2" style={{ width: '200px' }}>
              <div
                className="relative cursor-pointer rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity h-1/2"
                onClick={() => openGallery(1)}
              >
                <img
                  src={previewImages[1]}
                  alt={`${title} Bild 2`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {previewImages.length > 2 && (
                <div
                  className="relative cursor-pointer rounded-lg overflow-hidden bg-muted hover:opacity-90 transition-opacity h-1/2"
                  onClick={() => openGallery(2)}
                >
                  <img
                    src={previewImages[2]}
                    alt={`${title} Bild 3`}
                    className="w-full h-full object-cover"
                  />
                  {remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Full Gallery Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95">
          <DialogTitle className="sr-only">
            Bildergalerie für {title}
          </DialogTitle>
          
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Image */}
            <div className="relative flex items-center justify-center min-h-[60vh]">
              <img
                src={images[currentIndex]}
                alt={`${title} Bild ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-4 text-white hover:bg-white/10"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-4 text-white hover:bg-white/10"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentIndex + 1} von {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
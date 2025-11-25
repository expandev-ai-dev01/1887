import { useState } from 'react';
import type { VehicleGalleryProps } from './types';
import { cn } from '@/core/lib/utils';
import { Dialog, DialogContent } from '@/core/components/dialog';
import { Button } from '@/core/components/button';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

function VehicleGallery({ photos, mainPhoto }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allPhotos = [{ url: mainPhoto, legenda: 'Foto principal' }, ...photos];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allPhotos.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleOpenLightbox = () => {
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="bg-muted group relative aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={allPhotos[selectedIndex]?.url}
            alt={allPhotos[selectedIndex]?.legenda || `Foto ${selectedIndex + 1}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleOpenLightbox}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          {allPhotos.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
          {allPhotos[selectedIndex]?.legenda && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-sm text-white">{allPhotos[selectedIndex].legenda}</p>
            </div>
          )}
        </div>

        {allPhotos.length > 1 && (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {allPhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  'group relative aspect-video overflow-hidden rounded-lg border-2 transition-all',
                  selectedIndex === index
                    ? 'border-primary ring-primary/20 ring-2'
                    : 'hover:border-primary/50 border-transparent'
                )}
              >
                <img
                  src={photo.url}
                  alt={photo.legenda || `Miniatura ${index + 1}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] p-0" showCloseButton={true}>
          <div className="relative aspect-video w-full">
            <img
              src={allPhotos[selectedIndex]?.url}
              alt={allPhotos[selectedIndex]?.legenda || `Foto ${selectedIndex + 1}`}
              className="h-full w-full object-contain"
            />
            {allPhotos.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            {allPhotos[selectedIndex]?.legenda && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-center text-white">{allPhotos[selectedIndex].legenda}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export { VehicleGallery };

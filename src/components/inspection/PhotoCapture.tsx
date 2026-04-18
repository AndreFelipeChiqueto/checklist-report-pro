import { useRef } from 'react';
import { Camera, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoCaptureProps {
  photoUrls: string[];
  onAdd: (photoUrl: string) => void;
  onRemove: (index: number) => void;
}

export const PhotoCapture = ({ photoUrls, onAdd, onRemove }: PhotoCaptureProps) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          onAdd(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      {/* Grade de fotos */}
      {photoUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-2 animate-fade-in">
          {photoUrls.map((url, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={url}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border-2 border-border"
              />
              <button
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full shadow-lg"
                type="button"
                aria-label={`Remover foto ${index + 1}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Inputs ocultos */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Botões sempre visíveis */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleCameraClick}
          type="button"
          className={cn(
            'flex-1 h-20 flex flex-col gap-2 border-dashed border-2',
            'hover:bg-accent/50 hover:border-accent'
          )}
        >
          <Camera className="w-6 h-6" />
          <span className="text-sm">Câmera</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleGalleryClick}
          type="button"
          className={cn(
            'flex-1 h-20 flex flex-col gap-2 border-dashed border-2',
            'hover:bg-accent/50 hover:border-accent'
          )}
        >
          <Image className="w-6 h-6" />
          <span className="text-sm">Galeria</span>
        </Button>
      </div>
    </div>
  );
};

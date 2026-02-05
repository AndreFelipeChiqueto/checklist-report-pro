import { useRef } from 'react';
import { Camera, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoCaptureProps {
  photoUrl?: string;
  onCapture: (photoUrl: string) => void;
  onRemove: () => void;
}

export const PhotoCapture = ({ photoUrl, onCapture, onRemove }: PhotoCaptureProps) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  if (photoUrl) {
    return (
      <div className="relative animate-scale-in">
        <img
          src={photoUrl}
          alt="Foto do item"
          className="w-full h-48 object-cover rounded-lg border-2 border-border"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Input para câmera */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Input para galeria */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleCameraClick}
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

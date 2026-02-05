import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bed23597ce4a4c25878e9b586eda145e',
   appName: 'Inspeção de Elevadores',
  webDir: 'dist',
  server: {
    url: 'https://bed23597-ce4a-4c25-878e-9b586eda145e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      presentationStyle: 'fullScreen'
    }
  }
};

export default config;

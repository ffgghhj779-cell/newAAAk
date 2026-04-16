import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sovereignmaareg.app',
  appName: 'Sovereign Maareg Fund',
  webDir: 'out',
  server: {
    // Point to the live production URL
    // The app will load the website inside a native WebView
    url: 'https://www.almaarijsovereignwealthfund.com',
    cleartext: false,
  },
  android: {
    // Allow mixed content for external images
    allowMixedContent: true,
    // Custom WebView user agent to identify app traffic
    appendUserAgent: 'SovereignMaaregApp/1.0',
    // Background color while loading
    backgroundColor: '#050B14',
    // Handle back button gracefully
    overrideUserAgent: undefined,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#050B14',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#050B14',
    },
  },
};

export default config;

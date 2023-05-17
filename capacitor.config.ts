import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.angular',
  appName: 'gocarshare',
  webDir: 'dist/gocarshare',
  bundledWebRuntime: false,
  cordova: {},
  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      "http://34.122.10.135:80/api/*"
    ]
  }
};

export default config;
 
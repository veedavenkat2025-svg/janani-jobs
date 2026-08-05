import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jananijobs.app',
  appName: 'Janani Jobs',
  webDir: 'public',
  server: {
    url: 'https://janani-jobs-beta.vercel.app',
    cleartext: false
  }
};

export default config;

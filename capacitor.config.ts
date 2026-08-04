import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jananijobs.app',
  appName: 'Janani Jobs',
  webDir: 'public',
  server: {
    url: 'https://janani-jobs-beta.vercel.app',
    cleartext: true
  }
};

export default config;

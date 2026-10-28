import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  workers: 1,
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3180',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:3180',
    channel: 'chrome',
    reducedMotion: 'reduce',
    locale: 'en-US',
    colorScheme: 'light',
  },
});

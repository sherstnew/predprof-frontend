import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://solaris.sherstd.ru/api/v1/openapi.json',
  output: 'lib/client',
  client: '@hey-api/client-fetch',
  plugins: [
    '@hey-api/typescript',
    '@hey-api/sdk',
  ],
});
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.vanmee.cn',
  output: 'static',

  trailingSlash: 'never',

  build: {
    format: 'directory'
  }
});
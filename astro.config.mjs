// @ts-check

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://freepromptbase.com',
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro'
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://kc.in.th',
  integrations: [svelte(), markdoc(), sitemap(), keystatic(), react()],
  adapter: vercel(),
  output: 'static',
  redirects: {
    "/go/facebook": {
      status: 301,
      destination: "https://facebook.com/kamontatc"
    }
  }
});

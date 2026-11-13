import { defineConfig } from 'astro/config';
export default defineConfig({ site: process.env.SITE_URL || 'https://blog.ccoshong.top', base: process.env.BASE_PATH || '/', output: 'static' });

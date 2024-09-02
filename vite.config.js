import { defineConfig } from 'vitest/config';
import postcss from './postcss.config.js';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],

	css: {
		postcss
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

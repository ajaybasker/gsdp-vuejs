import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import proxyOptions from './proxyOptions.ts';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		port: 8080,
		host: '0.0.0.0',
		proxy: proxyOptions
	},
	resolve: {
		alias: {
			'@': path.resolve(import.meta.dirname, 'src')
		}
	},
	build: {
		outDir: '../gsdp/public/gsdp-ui',
		emptyOutDir: true,
		target: 'es2015',
	},
});

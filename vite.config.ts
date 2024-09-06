import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3003,
		cors: true,
		host: "0.0.0.0",
		hmr: {
			path: "/ws",
		},
	},
	css: {
		devSourcemap: true,
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src"),
		},
	},
});

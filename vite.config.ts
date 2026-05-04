import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [react(), tailwindcss()],

	resolve: {
		alias: {
			"@api": path.resolve(__dirname, "src/api"),
			"@hooks": path.resolve(__dirname, "src/components/dashboard/dashHooks"),
			"@components": path.resolve(__dirname, "src/components"),
			"@context": path.resolve(__dirname, "src/context"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},
});

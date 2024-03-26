import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";
const { EsLinter, linterPlugin } = EsLint;

const peerDependencies = packageJson.peerDependencies || {};

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
	optimizeDeps: {
		esbuildOptions: {
			supported: {
				"top-level-await": true,
			},
		},
	},
	plugins: [
		react(),
		tsConfigPaths(),
		linterPlugin({
			include: ["./src}/**/*.{ts,tsx}"],
			linters: [new EsLinter({ configEnv })],
		}),
		dts({
			include: ["src/components/"],
		}),
	],
	build: {
		target: "esnext",
		lib: {
			entry: resolve("src", "components/index.ts"),
			name: "React Breadboard Components",
			formats: ["es", "umd"],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: [...Object.keys(peerDependencies)],
		},
	},
	server: {
		port: 5173,
		strictPort: true,
		proxy: {
			"/v1/complete": {
				target: "https://api.anthropic.com",
				changeOrigin: true,
			},
		},
	},
}));

import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";
const { EsLinter, linterPlugin } = EsLint;
import path from "path-browserify";

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
			"/anthropic": {
				target: "https://api.anthropic.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/anthropic/, ""),
			},
			"/claude": {
				target: "https://api.anthropic.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/claude/, "/v1/complete"),
			},
			"/developer": {
				target: "https://developer.chrome.com",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(
						/^\/developer/,
						"/blog/introducing-scheduler-yield-origin-trial"
					),
			},
			"/chrome": {
				target: "https://chromestatus.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/chrome/, "/api/v0/features"),
				configure: (proxy, _options) => {
					proxy.on("error", (err, _req, _res) => {
						console.log("proxy error", err);
					});
				},
			},
			/* "/microlink": {
				target: "https://api.microlink.io",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(
						/^\/microlink/,
						"/?url=https://chromestatus.com/api/v0/features"
					),
			}, */
		},
	},
}));

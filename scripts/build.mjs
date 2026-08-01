import { build } from "esbuild";

const watch = process.argv.includes("--watch");

const options = {
	entryPoints: ["src/jsgame.js"],
	bundle: true,
	format: "esm",
	target: "es2020",
	outfile: "dist/jsgame.js",
	sourcemap: true,
	minify: false,
	platform: "browser",
	logLevel: "info",
};

if (watch) {
	options.watch = {
		onRebuild(error) {
			if (error) console.error("[watch] build failed:", error);
			else console.log("[watch] build succeeded");
		},
	};
}

build(options).catch(() => process.exit(1));

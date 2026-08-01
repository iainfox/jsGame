import { build } from "esbuild";
import { copyFileSync, cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/space-shooter", { recursive: true });

await build({
	entryPoints: ["space-shooter/main.js"],
	bundle: true,
	format: "esm",
	target: "es2020",
	outfile: "dist/space-shooter/main.js",
	sourcemap: false,
	minify: false,
	platform: "browser",
	logLevel: "info",
});

copyFileSync("index.html", "dist/index.html");
copyFileSync("styles.css", "dist/styles.css");
copyFileSync("docs.html", "dist/docs.html");
copyFileSync("docs.js", "dist/docs.js");
cpSync("assets", "dist/assets", { recursive: true });

const gameHtml = readFileSync("space-shooter/index.html", "utf8");
const bundled = gameHtml.replace(/[\t ]*<script type="importmap">[\s\S]*?<\/script>\n?/, "");
writeFileSync("dist/space-shooter/index.html", bundled);

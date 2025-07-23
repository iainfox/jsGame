import { jsgame } from "./src/jsgame.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

if (canvas == null) {
    throw new Error("No canvas found")
}

canvas.width = globalThis.innerWidth;
canvas.height = globalThis.innerHeight;

const surface = canvas.getContext("2d");
if (!surface) throw new Error("Could not get 2D context");

const points = [
	[25, 20],
	[80, 26],
	[180, 80],
];

jsgame.draw.lines(surface, "#FF0000", true, points, 1);

jsgame.draw.ellipse(
	surface,
	"#FF0000",
	new jsgame.core.Rect([325, 80], [120, 60]),
	0,
);

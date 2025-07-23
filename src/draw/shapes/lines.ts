import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";

export function lines(
    ctx: CanvasRenderingContext2D,
    color: Color,
    closed: boolean,
    points: Array<Array<number>>, 
    width = 1
) {
	if (!Array.isArray(points)) {
		throw new Error('"points" must be an array of integer arrays');
	}

	if (points.length < 2) {
		throw new Error('"points" must contain 2 or more points');
	}

	const xs = points.map((p) => p[0]);
	const ys = points.map((p) => p[1]);

	const left = Math.min(...xs);
	const top = Math.min(...ys);
	const right = Math.max(...xs);
	const bottom = Math.max(...ys);

	const rWidth = right - left;
	const rHeight = bottom - top;

	if (width < 1) {
		const p1 = points[0];
		return new core.Rect([p1[0], p1[1]], [0, 0]);
	}

	ctx.lineWidth = width;
	ctx.fillStyle = color.hex3;
	ctx.strokeStyle = color.hex3;

	ctx.beginPath();

	points.map((p) => ctx.lineTo(p[0], p[1]));

	if (closed) {
		ctx.closePath();
	}

	ctx.stroke();

	return new core.Rect([left, top], [rWidth, rHeight]);
}

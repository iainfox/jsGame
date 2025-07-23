import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";

export function circle(
	ctx: CanvasRenderingContext2D,
	color: Color,
	center: Array<number>,
	radius: number,
	width: number = 0,
	draw_top_right: boolean = false,
	draw_top_left: boolean = false,
	draw_bottom_left: boolean = false,
	draw_bottom_right: boolean = false,
) {
	ctx.fillStyle = color.hex3;
	ctx.strokeStyle = color.hex3;
	if (!Array.isArray(center) || center.length !== 2) {
		throw new Error("center must be an array of two numbers [x, y]");
	}
	if (!(radius % 1 == 0)) {
		throw new Error("radius must be an integer");
	}

	const x = center[0];
	const y = center[1];
	const top = y - radius;
	const bottom = y + radius;
	const left = x - radius;
	const right = x + radius;

	if (width < 0 || radius < 0) {
		return new core.Rect([x, y], [0, 0]);
	}

	ctx.lineWidth = width;

	if (
		draw_top_right || draw_top_left || draw_bottom_left || draw_bottom_right
	) {
		if (draw_top_right) {
			ctx.beginPath();
			ctx.arc(x, y, radius, Math.PI * 1.5, 0);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}
		if (draw_top_left) {
			ctx.beginPath();
			ctx.arc(x, y, radius, Math.PI, Math.PI * 1.5);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}
		if (draw_bottom_left) {
			ctx.beginPath();
			ctx.arc(x, y, radius, Math.PI / 2, Math.PI);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}
		if (draw_bottom_right) {
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI / 2);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}

		const corners = [];
		if (draw_top_left) corners.push([left, top]);
		if (draw_top_right) corners.push([right, top]);
		if (draw_bottom_left) corners.push([left, bottom]);
		if (draw_bottom_right) corners.push([right, bottom]);

		const xs = corners.map((p) => p[0]);
		const ys = corners.map((p) => p[1]);
		const minX = Math.min(...xs);
		const maxX = Math.max(...xs);
		const minY = Math.min(...ys);
		const maxY = Math.max(...ys);

		return new core.Rect([minX, minY], [maxX - minX, maxY - minY]);
	} else {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);

		if (width === 0) {
			ctx.fill();
		}

		ctx.stroke();
	}

	return new core.Rect([left, top], [radius * 2, radius * 2]);
}

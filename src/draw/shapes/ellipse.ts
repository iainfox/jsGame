import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";
import { Rect } from "../../core/Rect.ts";

export function ellipse(
    ctx: CanvasRenderingContext2D,
    color: Color,
    rect: Rect,
    width: number = 0
) {
	ctx.lineWidth = width;
	ctx.fillStyle = color.hex3;
	ctx.strokeStyle = color.hex3;

	if (width < 0) {
		return new core.Rect([rect.left, rect.top], [0, 0]);
	}

	const centerX = rect.left;
	const centerY = rect.top;

	const rWidth = rect.width;
	const rHeight = rect.height;

	ctx.beginPath();

	ctx.ellipse(centerX, centerY, rWidth, rHeight, 0, 0, 2 * Math.PI);

	if (width === 0) {
		ctx.fill();
	}

	ctx.stroke();
}

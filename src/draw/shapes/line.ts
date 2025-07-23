import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";

export function line(
    ctx: CanvasRenderingContext2D, 
    color: Color,
    startPos: Array<number>, 
    endPos: Array<number>,
    width: number = 1) {

	const x1 = startPos[0];
	const y1 = startPos[1];
	const x2 = endPos[0];
	const y2 = endPos[1];

	const rWidth = Math.max(x1, x2) - Math.min(x1, x2);
	const rHeight = Math.max(y1, y2) - Math.min(y1, y2);

	if (width < 1) {
		return new core.Rect(Math.min(x1, x2), Math.min(y1, y2), rWidth, rHeight);
	}

	ctx.lineWidth = width;
	ctx.fillStyle = color.hex3;
	ctx.strokeStyle = color.hex3;

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();

	return new core.Rect(Math.min(x1, x2), Math.min(y1, y2), rWidth, rHeight);
}

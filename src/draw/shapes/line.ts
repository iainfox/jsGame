import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";

export function line(
    ctx: CanvasRenderingContext2D, 
    color: Color | string | number[] = new Color(0, 0, 0),
    startPos: Array<number>, 
    endPos: Array<number>,
    width: number = 1) {
    let colorObj: Color;
    if (color instanceof Color) {
        colorObj = color;
    } else if (typeof color === "string") {
        colorObj = new Color(color);
    } else if (Array.isArray(color)) {
        if (color.length === 3) {
            colorObj = new Color(color[0], color[1], color[2]);
        } else if (color.length === 1 && typeof color[0] === "string") {
            colorObj = new Color(color[0]);
        } else {
            colorObj = new Color(0, 0, 0);
        }
    } else {
        colorObj = new Color(0, 0, 0);
    }

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
	ctx.fillStyle = colorObj.hex3;
	ctx.strokeStyle = colorObj.hex3;

	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();

	return new core.Rect(Math.min(x1, x2), Math.min(y1, y2), rWidth, rHeight);
}

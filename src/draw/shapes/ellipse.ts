import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";
import { Rect } from "../../core/Rect.ts";

export function ellipse(
    ctx: CanvasRenderingContext2D,
    color: Color | string | number[] = new Color(0, 0, 0),
    rect: Rect,
    width: number = 0
) {
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

	ctx.lineWidth = width;
	ctx.fillStyle = colorObj.hex3;
	ctx.strokeStyle = colorObj.hex3;

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

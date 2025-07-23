import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";
import { Rect } from "../../core/Rect.ts";

export function rect(
	ctx: CanvasRenderingContext2D,
	color: Color | string | number[] = new Color(0, 0, 0),
	rect: Rect,
	width: number = 0,
	borderRadius: number = 0,
	borderTopLeftRadius: number = 0,
	borderTopRightRadius: number = 0,
	borderBottomLeftRadius: number = 0,
	borderBottomRightRadius: number = 0,
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

	ctx.fillStyle = colorObj.hex3;
	ctx.strokeStyle = colorObj.hex3;
	if (width == 0) {
		ctx.fillRect(rect.left, rect.top, rect.width, rect.height);

		return new core.Rect(rect.left, rect.top, rect.width, rect.height);
	} else if (width > 0) {
		ctx.lineWidth = width;

        if (borderBottomLeftRadius || borderBottomRightRadius || borderTopLeftRadius || borderTopRightRadius) {
            ctx.roundRect(
                rect.left + width / 2,
                rect.top + width / 2,
                rect.width - width,
                rect.height - width,
                [borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius],
            )
        } else {
            ctx.roundRect(
                rect.left + width / 2,
                rect.top + width / 2,
                rect.width - width,
                rect.height - width,
                borderRadius,
            );
        }
        ctx.stroke();

		return new core.Rect(rect.left, rect.top, rect.width, rect.height);
	} else if (width < 0) {
		return new core.Rect(rect.left, rect.top, rect.width, rect.height);
	}
}

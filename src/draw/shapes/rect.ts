import { Color } from "../../core/color.ts";
import { core } from "../../core/core.ts";
import { Rect } from "../../core/Rect.ts";

export function rect(
	ctx: CanvasRenderingContext2D,
	color: Color = new Color(0, 0, 0),
	rect: Rect,
	width: number = 0,
	borderRadius: number = 0,
	borderTopLeftRadius: number = 0,
	borderTopRightRadius: number = 0,
	borderBottomLeftRadius: number = 0,
	borderBottomRightRadius: number = 0,
) {
	ctx.fillStyle = color.hex3;
	ctx.strokeStyle = color.hex3;
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

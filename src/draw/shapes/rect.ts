import { core } from "../../core/core.js"

export function rect(ctx, color, rect, width = 0,
	borderRadius = 0, borderTopLeftRadius = -1, borderTopRightRadius = -1, 
borderBottomLeftRadius = -1, borderBottomRightRadius = -1) {

	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;
	if (width == 0){
		ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
		
		return new core.Rect(rect.left, rect.top, rect.width, rect.height);
	} else if (width > 0){
		ctx.lineWidth = width;

		ctx.roundRect(
		rect.left + width / 2,
		rect.top + width / 2,
		rect.width - width,
		rect.height - width,
		borderRadius
		);
		ctx.stroke();

		return new core.Rect(rect.left, rect.top, rect.width, rect.height);
	} else if (width < 0){
		return new core.Rect(rect.left, rect.top, rect.width, rect.height);
	}
}

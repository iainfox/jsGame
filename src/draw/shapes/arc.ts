import { core } from "../../core/core.js"

export function arc(ctx, color, rect, startAngle, stopAngle, width=1) {
	if (width <= 0) {
		return new core.Rect([rect.left, rect.top], [0, 0]);
	}

	ctx.lineWidth = width;
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;

	ctx.beginPath();
	ctx.arc(rect.left, rect.top, rect.width, rect.height, 0, startAngle, stopAngle);
	ctx.stroke();

	return new core.Rect([rect.left, rect.top], [rect.width, rect.height]);
}
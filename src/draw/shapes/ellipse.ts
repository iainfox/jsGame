import { core } from "../../core/core.js"

export function ellipse(ctx, color, rect, width=0) {
	ctx.lineWidth = width;
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;
	
	if (width < 0) {
		return core.Rect([rect.left, rect.top], [0, 0]);
	}

	let centerX = rect.left;
	let centerY = rect.top;

	let rWidth = rect.width;
	let rHeight = rect.height;

	ctx.beginPath();

	ctx.ellipse(centerX, centerY, rWidth, rHeight, 0, 0, 2 * Math.PI);

	if (width === 0) {
		ctx.fill();
	}

	ctx.stroke();
}
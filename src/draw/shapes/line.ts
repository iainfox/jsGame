import { core } from "../../core/core.js"

export function line(ctx, color, startPos, endPos, width=1) {

	const rWidth = Math.max(x1, x2) - Math.min(x1, x2);
	const rHeight = Math.max(y1, y2) - Math.min(y1, y2);

	if (width < 1) {
		return new core.Rect(Math.min(x1, x2), Math.min(y1, y2), rWidth, rHeight);
	}
	
	ctx.lineWidth = width;
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;

	let x1 = startPos[0];
	let y1 = startPos[1];
	let x2 = endPos[0];
	let y2 = endPos[1];
	
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	return new core.Rect(Math.min(x1, x2), Math.min(y1, y2), rWidth, rHeight);
}
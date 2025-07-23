import { core } from "../../core/core.js"

export function polygon(ctx, color, points, width=0) {
	if (!Array.isArray(points)) {
		throw new Error("\"points\" must be an array of integer arrays");
	}
	
	if (points.length < 3) {
		throw new Error("\"points\" must contain 3 or more points");
	}
	
	let xs = points.map(p => p[0]);
	let ys = points.map(p => p[1]);
	
	let left = Math.min(...xs);
	let top = Math.min(...ys);
	let right = Math.max(...xs);
	let bottom = Math.max(...ys);
	
	let rWidth = right-left;
	let rHeight = bottom-top;
	
	if (width < 0) {
		let p1 = points[0]
		return new core.Rect([p1[0], p1[1]], [0, 0]);
	}
	
	ctx.lineWidth = width;
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;
	
	ctx.beginPath();

	points.map(p => ctx.lineTo(p[0], p[1]))

	ctx.closePath();

	if (width === 0) {
		ctx.fill()
	}
	
	ctx.stroke();
	
	return new core.Rect([left, top], [rWidth, rHeight]);
}
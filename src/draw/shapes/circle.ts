import { core } from "../../core/core.js"

export function circle(ctx, color, center, radius, width=0, draw_top_right=false, draw_top_left=false, draw_bottom_left=false, draw_bottom_right=false) {
	ctx.fillStyle = new core.Color(color).hex3;
	ctx.strokeStyle = new core.Color(color).hex3;
	if (!Array.isArray(center) || center.length !== 2) {
		throw new Error("center must be an array of two numbers [x, y]");
	}
	if (!typeof(radius) == 'number' || !(radius % 1 == 0)) {
		throw new Error("radius must be an integer");
	}

	let x = center[0];
	let y = center[1];
	let top = y - radius;
	let bottom = y + radius;
	let left = x - radius;
	let right = x + radius;

	if (width < 0 || radius < 0) {
		return new core.Rect([x, y], [0, 0]);
	}

	ctx.lineWidth = width;

	if (draw_top_right || draw_top_left || draw_bottom_left || draw_bottom_right) {
		if (draw_top_right) {
			ctx.beginPath();
			ctx.arc(x, y, radius, Math.PI * 1.5, 0);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}
		if (draw_top_left) {
			ctx.beginPath();
			ctx.arc(x, y, radius, Math.PI, Math.PI * 1.5);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}
		if (draw_bottom_left) {
			ctx.beginPath();
			ctx.arc(x, y, radius, Math.PI/2, Math.PI);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}
		if (draw_bottom_right) {
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI/2);
			if (width === 0) {
				ctx.lineTo(x, y);
				ctx.fill();
			}
			ctx.stroke();
		}

		const corners = [];
		if (draw_top_left) {corners.push([left, top])};
		if (draw_top_right) {corners.push([right, top])};
		if (draw_bottom_left) {corners.push([left, bottom])};
		if (draw_bottom_right) {corners.push([right, bottom])};

		const xs = corners.map(p => p[0]);
		const ys = corners.map(p => p[1]);
		const minX = Math.min(...xs);
		const maxX = Math.max(...xs);
		const minY = Math.min(...ys);
		const maxY = Math.max(...ys);

		return new core.Rect([minX, minY], [maxX - minX, maxY - minY]);

	} else {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);

		if (width === 0) {
			ctx.fill();
		}

		ctx.stroke();
	}

	return new core.Rect([left, top], [radius*2, radius*2]);
}

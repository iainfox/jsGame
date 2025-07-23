export class Rect {
    left: number;
    top: number;
    width: number;
    height: number;

    type: string;
    dataType: string;

	constructor(...args: [number, number, number, number] | [[number, number], [number, number]] | [object]) {
		if (args.length === 4) {
			if (
				typeof args[0] !== "number" ||
				typeof args[1] !== "number" ||
				typeof args[2] !== "number" ||
				typeof args[3] !== "number"
			) {
				throw new Error("Invalid arguments for Rect");
			}
			this.left = Number(args[0]);
			this.top = Number(args[1]);
			this.width = Number(args[2]);
			this.height = Number(args[3]);
		} else if (
			args.length === 2 &&
			Array.isArray(args[0]) && args[0].length === 2 &&
			Array.isArray(args[1]) && args[1].length === 2 &&
			typeof args[0][0] === "number" && typeof args[0][1] === "number" &&
			typeof args[1][0] === "number" && typeof args[1][1] === "number"
		) {
			this.left = Number(args[0][0]);
			this.top = Number(args[0][1]);
			this.width = Number(args[1][0]);
			this.height = Number(args[1][1]);
		} else if (
			args.length === 1 &&
			typeof args[0] === "object" &&
			args[0] !== null &&
			!Array.isArray(args[0])
		) {
			const obj = args[0] as { left?: number; x?: number; top?: number; y?: number; width?: number; height?: number };
			const left = obj.left ?? obj.x;
			const top = obj.top ?? obj.y;
			const width = obj.width;
			const height = obj.height;
			if (
				(left !== undefined && typeof left !== "number") ||
				(top !== undefined && typeof top !== "number") ||
				(width !== undefined && typeof width !== "number") ||
				(height !== undefined && typeof height !== "number")
			) {
				throw new Error("Invalid arguments for Rect");
			}
			this.left = left ?? 0;
			this.top = top ?? 0;
			this.width = width ?? 0;
			this.height = height ?? 0;
		} else {
			throw new Error("Invalid arguments for Rect");
		}
		this.type = "Rect";
		this.dataType = "DrawableObject";
	}

	get right() {
		return this.left + this.width;
	}

	get bottom() {
		return this.top + this.height;
	}

	copy() {
		return new Rect([this.left, this.top], [this.width, this.height]);
	}

	move(x: number, y: number) {
		const newRect = this.copy();
		newRect.left += x;
		newRect.top += y;
		return newRect;
	}

	moveInPlace(x: number, y: number) {
		this.left += x;
		this.top += y;
	}

	inflate(x: number, y: number) {
		const newRect = this.copy();
		newRect.width += x;
		newRect.height += y;
		return newRect;
	}

	inflateInPlace(x: number, y: number) {
		this.width += x;
		this.height += y;
	}

	scaleBy(x: number, y: number) {
		const newRect = this.copy();
		newRect.width *= x;
		newRect.height *= y;
		return newRect;
	}

	scaleByInPlace(x: number, y: number) {
		this.width *= x;
		this.height *= y;
	}

	update(...args: [number, number, number, number] | [[number, number], [number, number]] | [object]) {
		if (args.length === 4) {
			if (
				typeof args[0] !== "number" ||
				typeof args[1] !== "number" ||
				typeof args[2] !== "number" ||
				typeof args[3] !== "number"
			) {
				throw new Error("Invalid arguments for Rect");
			}
			this.left = args[0];
			this.top = args[1];
			this.width = args[2];
			this.height = args[3];
		} else if (
			args.length === 2 &&
			Array.isArray(args[0]) && args[0].length === 2 &&
			Array.isArray(args[1]) && args[1].length === 2 &&
			typeof args[0][0] === "number" && typeof args[0][1] === "number" &&
			typeof args[1][0] === "number" && typeof args[1][1] === "number"
		) {
			this.left = args[0][0];
			this.top = args[0][1];
			this.width = args[1][0];
			this.height = args[1][1];
		} else if (
			args.length === 1 &&
			typeof args[0] === "object" &&
			args[0] !== null &&
			!Array.isArray(args[0])
		) {
			const obj = args[0] as { left?: number; top?: number; x?: number; y?: number; width?: number; height?: number };
			const left = obj.left ?? obj.x;
			const top = obj.top ?? obj.y;
			const width = obj.width;
			const height = obj.height;
			if (
				(left !== undefined && typeof left !== "number") ||
				(top !== undefined && typeof top !== "number") ||
				(width !== undefined && typeof width !== "number") ||
				(height !== undefined && typeof height !== "number")
			) {
				throw new Error("Invalid arguments for Rect");
			}
			this.left = left ?? 0;
			this.top = top ?? 0;
			this.width = width ?? 0;
			this.height = height ?? 0;
		} else {
			throw new Error("Invalid arguments for Rect");
		}
	}

	clamp(rect: Rect) {
		const newRect = this.copy();
		if (newRect.width > rect.width) {
			newRect.left = rect.left + (rect.width / 2);
		} else {
			newRect.left = rect.left;
		}

		if (newRect.height > rect.height) {
			newRect.top = rect.top + (rect.height / 2);
		} else {
			newRect.top = rect.top;
		}
		return newRect;
	}

	clampInPlace(rect: Rect) {
		if (this.width > rect.width) {
			this.left = rect.left + (rect.width / 2);
		} else {
			this.left = rect.left;
		}

		if (this.height > rect.height) {
			this.top = rect.top + (rect.height / 2);
		} else {
			this.top = rect.top;
		}
	}

	clip(rect: Rect) {
		const left = Math.max(this.left, rect.left);
		const top = Math.max(this.top, rect.top);
		const right = Math.min(this.right, rect.right);
		const bottom = Math.min(this.bottom, rect.bottom);

		const width = right - left;
		const height = bottom - top;

		if (width <= 0 || height <= 0) {
			return new Rect(0, 0, 0, 0);
		}

		return new Rect(left, top, width, height);
	}

	union(rect: Rect) {
		const left = Math.min(this.left, rect.left);
		const top = Math.min(this.top, rect.top);
		const right = Math.max(this.right, rect.right);
		const bottom = Math.max(this.bottom, rect.bottom);

		const width = right - left;
		const height = bottom - top;

		return new Rect(left, top, width, height);
	}

	unionInPlace(rect: Rect) {
		const left = Math.min(this.left, rect.left);
		const top = Math.min(this.top, rect.top);
		const right = Math.max(this.right, rect.right);
		const bottom = Math.max(this.bottom, rect.bottom);

		const width = right - left;
		const height = bottom - top;

		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}

	unionAll(rectSequence: Array<Rect>) {
		const left = Math.min(this.left, ...rectSequence.map((r) => r.left));
		const top = Math.min(this.top, ...rectSequence.map((r) => r.top));
		const right = Math.max(this.right, ...rectSequence.map((r) => r.right));
		const bottom = Math.max(this.bottom, ...rectSequence.map((r) => r.bottom));

		const width = right - left;
		const height = bottom - top;

		return new Rect(left, top, width, height);
	}

	unionAllInPlace(rectSequence: Array<Rect>) {
		const left = Math.min(this.left, ...rectSequence.map((r) => r.left));
		const top = Math.min(this.top, ...rectSequence.map((r) => r.top));
		const right = Math.max(this.right, ...rectSequence.map((r) => r.right));
		const bottom = Math.max(this.bottom, ...rectSequence.map((r) => r.bottom));

		const width = right - left;
		const height = bottom - top;

		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}

	contains(rect: Rect) {
		return (rect.left > this.left && rect.right < this.right) &&
			(rect.top > this.top && rect.bottom < this.bottom);
	}

	collidePoint(x: number, y: number) {
		return (x > this.left && x < this.right) &&
			(y > this.top && y < this.bottom);
	}

	*[Symbol.iterator]() {
		yield this.left;
		yield this.top;
		yield this.width;
		yield this.height;
	}
}

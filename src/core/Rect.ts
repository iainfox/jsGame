export class Rect {
	constructor(...args) {
		if (args.length === 4) {
			this.left = args[0];
			this.top = args[1];
			this.width = args[2];
			this.height = args[3];
		} else if (args.length === 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
			this.left = args[0][0];
			this.top = args[0][1];
			this.width = args[1][0];
			this.height = args[1][1];
		} else if (args.length === 1 && typeof args[0] === 'object') {
			const obj = args[0];
			this.left = obj.left ?? obj.x ?? 0;
			this.top = obj.top ?? obj.y ?? 0;
			this.width = obj.width ?? 0;
			this.height = obj.height ?? 0;
		} else {
			throw new Error('Invalid arguments for Rect');
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
		return new Rect((this.left, this.top), (this.width, this.height));
	}
	
	move(x, y) {
		let newRect = this.copy();
		newRect.left += x;
		newRect.top += y;
		return newRect;
	}
	
	moveInPlace(x, y) {
		this.left += x;
		this.top += y;
	}
	
	inflate(x, y) {
		let newRect = this.copy();
		newRect.width += x;
		newRect.height += y;
		return newRect;
	}
	
	inflateInPlace(x, y) {
		this.width += x;
		this.height += y;
	}
	
	scaleBy(x, y) {
		let newRect = this.copy();
		newRect.width *= x;
		newRect.height *= y;
		return newRect;
	}
	
	scaleByInPlace(x, y) {
		this.width *= x;
		this.height *= y;
	}
	
	update(...args) {
		if (args.length === 4) {
			this.left = args[0];
			this.top = args[1];
			this.width = args[2];
			this.height = args[3];
		} else if (args.length === 2 && Array.isArray(args[0]) && Array.isArray(args[1])) {
			this.left = args[0][0];
			this.top = args[0][1];
			this.width = args[1][0];
			this.height = args[1][1];
		} else if (args.length === 1 && typeof args[0] === 'object') {
			const obj = args[0];
			this.left = obj.left ?? obj.x ?? 0;
			this.top = obj.top ?? obj.y ?? 0;
			this.width = obj.width ?? 0;
			this.height = obj.height ?? 0;
		} else {
			throw new Error('Invalid arguments for Rect');
		}
	}
	
	clamp(rect) {
		let newRect = this.copy();
		if (newRect.width > rect.width) {
			newRect.left = rect.left+(rect.width/2);
		} else {
			newRect.left = rect.left;
		}
		
		if (newRect.height > rect.height) {
			newRect.top = rect.top+(rect.height/2)
		} else {
			newRect.top = rect.top;
		}
		return newRect;
	}
	
	clampInPlace(rect) {
		if (this.width > rect.width) {
			this.left = rect.left+(rect.width/2);
		} else {
			this.left = rect.left;
		}
		
		if (this.height > rect.height) {
			this.top = rect.top+(rect.height/2)
		} else {
			this.top = rect.top;
		}
	}
	
	clip(rect) {
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

	union(rect) {
		const left = Math.min(this.left, rect.left);
		const top = Math.min(this.top, rect.top);
		const right = Math.max(this.right, rect.right);
		const bottom = Math.max(this.bottom, rect.bottom);
		
		const width = right - left;
		const height = bottom - top;

		return new Rect(left, top, width, height);
	}

	unionInPlace(rect) {
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

	unionAll(rectSequence) {
		const left = Math.min(this.left, ...rectSequence.map(r => r.left));
		const top = Math.min(this.top, ...rectSequence.map(r => r.top));
		const right = Math.max(this.right, ...rectSequence.map(r => r.right));
		const bottom = Math.max(this.bottom, ...rectSequence.map(r => r.bottom));
		
		const width = right - left;
		const height = bottom - top;

		return new Rect(left, top, width, height);
	}

	unionAllInPlace(rectSequence) {
		const left = Math.min(this.left, ...rectSequence.map(r => r.left));
		const top = Math.min(this.top, ...rectSequence.map(r => r.top));
		const right = Math.max(this.right, ...rectSequence.map(r => r.right));
		const bottom = Math.max(this.bottom, ...rectSequence.map(r => r.bottom));
		
		const width = right - left;
		const height = bottom - top;

		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}

	contains(rect) {
		return (rect.left > this.left && rect.right < this.right) && (rect.top > this.top && rect.bottom < this.bottom);
	}

	collidePoint(x, y) {
		return (x > this.left && x < this.right) && (y > this.top && y < this.bottom);
	}
	
	*[Symbol.iterator]() {
		yield this.left;
		yield this.top;
		yield this.width;
		yield this.height;
	}
}
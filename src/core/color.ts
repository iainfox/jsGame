export class Color {
    r: number;
    g: number;
    b: number;
    hex3: string;

	constructor(...args: [number, number, number] | [string]) {
		if (args.length === 3 && typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number") {
			[this.r, this.g, this.b] = args.map((v) => Math.max(0, Math.min(255, v)));
		} else if (args.length === 1 && typeof args[0] === "string") {
			const hex = args[0];
			switch (hex.length) {
				case 7:
					this.r = parseInt(hex.slice(1, 3), 16);
					this.g = parseInt(hex.slice(3, 5), 16);
					this.b = parseInt(hex.slice(5, 7), 16);
					break;
				case 6:
					this.r = parseInt(hex.slice(0, 2), 16);
					this.g = parseInt(hex.slice(2, 4), 16);
					this.b = parseInt(hex.slice(4, 6), 16);
					break;
				case 4:
					this.r = parseInt(hex[1] + hex[1], 16);
					this.g = parseInt(hex[2] + hex[2], 16);
					this.b = parseInt(hex[3] + hex[3], 16);
					break;
				case 3:
					this.r = parseInt(hex[0] + hex[0], 16);
					this.g = parseInt(hex[1] + hex[1], 16);
					this.b = parseInt(hex[2] + hex[2], 16);
					break;
				default:
					throw new Error(
						'Unknown color format. Use [R,G,B], "HEX", or 3-digit "HEX".',
					);
			}
		} else {
			throw new Error("Invalid color input.");
		}

		const toHexDigit = (v: number) => Math.round(v / 17).toString(16);
		this.hex3 = `#${toHexDigit(this.r)}${toHexDigit(this.g)}${toHexDigit(this.b)}`;
	}
}

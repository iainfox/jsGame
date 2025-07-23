export class Color {
	constructor(...args) {
		let r, g, b;

		if (args.length === 1 && Array.isArray(args[0])) {
			[r, g, b] = args[0].map(v => Math.max(0, Math.min(255, v)));
		}

		else if (args.length === 1 && typeof args[0] === "string") {
			const hex = args[0];
			switch (hex.length) {
				case 7:
					r = parseInt(hex.slice(1, 3), 16);
					g = parseInt(hex.slice(3, 5), 16);
					b = parseInt(hex.slice(5, 7), 16);
					break;
				case 6:
					r = parseInt(hex.slice(0, 2), 16);
					g = parseInt(hex.slice(2, 4), 16);
					b = parseInt(hex.slice(4, 6), 16);
					break;
				case 4:
					r = parseInt(hex[1] + hex[1], 16);
					g = parseInt(hex[2] + hex[2], 16);
					b = parseInt(hex[3] + hex[3], 16);
					break;
				case 3:
					r = parseInt(hex[0] + hex[0], 16);
					g = parseInt(hex[1] + hex[1], 16);
					b = parseInt(hex[2] + hex[2], 16);
					break;
				default:
					throw new Error("Unknown color format. Use [R,G,B], \"HEX\", or 3-digit \"HEX\".");
			}
		
		} else if (args.length === 3) {
			[r, g, b] = args[0].map(v => Math.max(0, Math.min(255, v)));
		} else {
			throw new Error("Invalid color input.");
		}

		const toHexDigit = v => Math.round(v / 17).toString(16);
		this.hex3 = `#${toHexDigit(r)}${toHexDigit(g)}${toHexDigit(b)}`;
	}
}
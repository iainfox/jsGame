import { core } from "./core/core.ts";
import { draw } from "./draw/draw.ts";

class JSGAME {
	initialized: boolean;
	quitCallbacks: Array<() => void>;
	core: typeof core;
	draw: typeof draw;

	constructor() {
		this.initialized = false;
		this.quitCallbacks = [];
		this.core = core;
		this.draw = draw;
	}

	init() {
		document.body.style.margin = "0px";
		let canvas = document.querySelector("canvas");
		if (canvas === null) {
			canvas = document.body.appendChild(document.createElement("canvas"));
		}
		canvas.id = "screen";
		canvas.width = globalThis.innerWidth;
		canvas.height = globalThis.innerHeight;
		this.initialized = true;
		return canvas.getContext("2d");
	}

	quit(close: boolean) {
		this.quitCallbacks.forEach((callback) => {
			callback();
		});
		if (close) {
			globalThis.close();
		}
	}

	getInit() {
		return this.initialized;
	}

	registerQuit(callback: () => void) {
		if (typeof callback !== "function") {
			throw new Error('"callback" argument must be a function');
		}
		this.quitCallbacks.push(callback);
	}
}

export const jsgame = new JSGAME();

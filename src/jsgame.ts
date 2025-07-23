import { core } from "./core/core.js";
import { draw } from "./draw/draw.js";

class JSGAME {
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
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		this.initialized = true;
		return canvas.getContext('2d');
	}

	quit(close) {
		this.quitCallbacks.forEach(callback => {
			callback();
		});
		if (close) {
			window.close();
		}
	}

	getInit() {
		return this.initialized;
	}

	registerQuit(callback) {
		if (!typeof(callback) === "function") {
			throw new Error("\"callback\" argument must be a function")
		}
		this.quitCallbacks.push(callback)
	}
};

export const jsgame = new JSGAME()
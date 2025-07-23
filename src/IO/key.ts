import createKeyDict from './keyPressed.js';
import { maps } from './keyMap.js'

export class Key {
	constructor() {
		this.keys = createKeyDict();
		this.type = "key";
		this.dataType = "key";
		
		document.addEventListener("keydown", (event) => {
			this.keys[event.code] = true;
		});
		
		document.addEventListener("keyup", (event) => {
			this.keys[event.code] = false;
		});
	}
	
	getPressed() {
		return this.keys;
	}

	getMods() {
		const mods = [];

		Object.keys(maps.ModKeyMap).forEach(mod => {
			if (this.keys[mod] === true) {
				mods.push(mod)
			}
		});
	  
		return mods;
	}

	name(keyCode) {
		return Object.keys(maps.KeyMap).find(key => maps.KeyMap[key] === keyCode) || null;
	}

	keyCode(name) {
		return maps.KeyMap[name] || null
	}
}
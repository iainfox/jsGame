import createKeyDict from "./keyPressed.ts";
import { maps } from "./keyMap.ts";

export class Key {
	keys: Record<string, boolean>;
	type: string;
	dataType: string;

	constructor() {
		this.keys = createKeyDict();
		this.type = "key";
		this.dataType = "key";

		document.addEventListener("keydown", (event: KeyboardEvent) => {
			this.keys[event.code] = true;
		});

		document.addEventListener("keyup", (event: KeyboardEvent) => {
			this.keys[event.code] = false;
		});
	}

	getPressed(): Record<string, boolean> {
		return this.keys;
	}

	getMods(): string[] {
		const mods: string[] = [];

		Object.keys(maps.ModKeyMap).forEach((mod: string) => {
			if (this.keys[mod] === true) {
				mods.push(mod);
			}
		});

		return mods;
	}

	name(keyCode: string): string | null {
		return (Object.keys(maps.KeyMap) as Array<keyof typeof maps.KeyMap>).find(
			(key) => maps.KeyMap[key] === keyCode
		) || null;
	}

	keyCode(name: keyof typeof maps.KeyMap): string | null {
		return maps.KeyMap[name] ?? null;
	}
}

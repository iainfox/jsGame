export class event {
    nameList: Record<string, number>;
    visible: boolean;
    queue: unknown[] = [];
    waitCb: Array<() => void> = [];
    blockedTypes: Set<unknown> = new Set();

	constructor() {
		this.nameList = {
			"NOEVENT": 0,
			"ACTIVEEVENT": 1,
			"QUIT": 256,
			"SYSTEMEVENT": 257,
			"WINDOWEVENT": 512,
			"WINDOWSHOWN": 513,
			"WINDOWHIDDEN": 514,
			"WINDOWEXPOSED": 515,
			"WINDOWMOVED": 516,
			"WINDOWRESIZED": 517,
			"WINDOWSIZECHANGED": 518,
			"WINDOWMINIMIZED": 519,
			"WINDOWMAXIMIZED": 520,
			"WINDOWRESTORED": 521,
			"WINDOWENTER": 522,
			"WINDOWLEAVE": 523,
			"WINDOWFOCUSGAINED": 524,
			"WINDOWFOCUSLOST": 525,
			"WINDOWTAKEFOCUS": 526,
			"WINDOWHITTEST": 527,
			"KEYDOWN": 768,
			"KEYUP": 769,
			"TEXTEDITING": 770,
			"TEXTINPUT": 771,
			"KEYMAPCHANGED": 772,
			"MOUSEMOTION": 1024,
			"MOUSEBUTTONDOWN": 1025,
			"MOUSEBUTTONUP": 1026,
			"MOUSEWHEEL": 1027,
			"JOYAXISMOTION": 1536,
			"JOYBALLMOTION": 1537,
			"JOYHATMOTION": 1538,
			"JOYBUTTONDOWN": 1539,
			"JOYBUTTONUP": 1540,
			"JOYDEVICEADDED": 1541,
			"JOYDEVICEREMOVED": 1542,
			"CONTROLLERAXISMOTION": 1616,
			"CONTROLLERBUTTONDOWN": 1617,
			"CONTROLLERBUTTONUP": 1618,
			"CONTROLLERDEVICEADDED": 1619,
			"CONTROLLERDEVICEREMOVED": 1620,
			"CONTROLLERDEVICEREMAPPED": 1621,
			"CONTROLLERTOUCHPADDOWN": 1622,
			"CONTROLLERTOUCHPADMOTION": 1623,
			"CONTROLLERTOUCHPADUP": 1624,
			"CONTROLLERSENSORUPDATE": 1625,
			"FINGERDOWN": 1792,
			"FINGERUP": 1793,
			"FINGERMOTION": 1794,
			"DOLLARGESTURE": 2048,
			"DOLLARRECORD": 2049,
			"MULTIGESTURE": 2050,
			"CLIPBOARDUPDATE": 2304,
			"DROPFILE": 4096,
			"DROPTEXT": 4097,
			"DROPBEGIN": 4098,
			"DROPCOMPLETE": 4099,
			"AUDIODEVICEADDED": 4352,
			"AUDIODEVICEREMOVED": 4353,
			"USEREVENT": 32866,
		};

        this.queue = [];
		this.waitCb = [];
		this.visible = true;
		this.blockedTypes = new Set();

		globalThis.addEventListener("mousemove", () => this.push(1024));
		globalThis.addEventListener("mousedown", () => this.push(1025));
		globalThis.addEventListener("mouseup", () => this.push(1026));
		globalThis.addEventListener("wheel", () => this.push(1076));

		globalThis.addEventListener("keydown", () => this.push(798));
		globalThis.addEventListener("keyup", () => this.push(769));

		globalThis.addEventListener("touchstart", () => this.push(1792));
		globalThis.addEventListener("touchmove", () => this.push(1794));
		globalThis.addEventListener("touchend", () => this.push(1793));

		globalThis.addEventListener("beforeunload", () => this.push(256));
		document.addEventListener("visibilitychange", () => {
			this.visible = !this.visible;
			this.push({ id: this.visible ? 513 : 514 });
		});

		globalThis.addEventListener("blur", () => this.push(1));
		globalThis.addEventListener("focus", () => this.push(1));

		globalThis.addEventListener("dragstart", () => this.push(4098));
		globalThis.addEventListener("dragend", () => this.push(4099));
		globalThis.addEventListener("drop", () => this.push(4096));

	}

	push(event: number | { id: number }) {
		const eventId = (event && typeof event === "object" && "id" in event)
			? event.id
			: event;
		if (!this.blockedTypes.has(eventId)) {
			this.queue.push(event);
		}
	}

	getEventId(name: string): number {
		if (name in this.nameList) {
			return this.nameList[name];
		} else {
			throw new Error("Unknown event name");
		}
	}

	getEventName(id: number): string {
		for (const [key, value] of Object.entries(this.nameList)) {
			if (value === id) {
				return key;
			}
		}
		throw new Error("Unknown event id");
	}

	get() {
		const events = [...this.queue];
		this.queue.length = 0;
		return events;
	}

	poll() {
		return this.queue.shift() || 0;
	}

	peek(eventType = undefined) {
		if (eventType === undefined) {
			return this.queue.length > 0;
		}

		return this.queue[eventType] && true || false;
	}

	clear(eventType: number | number[] | undefined = undefined) {
		if (eventType === undefined) {
			this.queue.length = 0;
		} else {
			const types = Array.isArray(eventType) ? eventType : [eventType];
			this.queue = this.queue.filter((event) => {
				const eventId: number = (event && typeof event === "object" && "id" in event)
					? (event as { id: number }).id
					: event as number;
				return !types.includes(eventId);
			});
		}
	}

	setBlocked(eventType: number | number[] | undefined = undefined) {
		if (eventType === undefined || eventType === null) {
			Object.values(this.nameList).forEach((id: number) => this.blockedTypes.add(id));
		} else if (Array.isArray(eventType)) {
			(eventType as number[]).forEach((type: number) => this.blockedTypes.add(type));
		} else {
			this.blockedTypes.add(eventType as number);
		}
	}

	setAllowed(eventType: number | number[] | undefined = undefined) {
		if (eventType === undefined || eventType === null) {
			this.blockedTypes.clear();
		} else if (Array.isArray(eventType)) {
			(eventType as number[]).forEach((type: number) => this.blockedTypes.delete(type));
		} else {
			this.blockedTypes.delete(eventType as number);
		}
	}

	getBlocked(eventType: number | number[] | undefined = undefined): boolean {
		if (eventType === undefined || eventType === null) {
			return false;
		}
		if (Array.isArray(eventType)) {
			return (eventType as number[]).some((type) => this.blockedTypes.has(type));
		}
		return this.blockedTypes.has(eventType as number);
	}
}

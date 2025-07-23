export class event {
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
			"USEREVENT": 32866
		};
        
        window.addEventListener('mousemove', this.push(1024));
        window.addEventListener('mousedown', this.push(1025));
        window.addEventListener('mouseup', this.push(1026));
        window.addEventListener('wheel', this.push(1076));

        window.addEventListener('keydown', this.push(798));
        window.addEventListener('keyup', this.push(769));

        window.addEventListener('touchstart', this.push(1792));
        window.addEventListener('touchmove', this.push(1794));
        window.addEventListener('touchend', this.push(1793));

        window.addEventListener('beforeunload', this.push(256));
        document.addEventListener('visibilitychange', () => {
            this.visible = !this.visible;
            this.push({ id: this.visible ? 513 : 514 });
        });

        window.addEventListener('blur', this.push(1));
        window.addEventListener('focus', this.push(1));

        window.addEventListener('dragstart', this.push(4098));
        window.addEventListener('dragend', this.push(4099));
        window.addEventListener('drop', this.push(4096));

		this.queue = [];
        this.waitCb = [];
        this.visible = true;
        this.blockedTypes = new Set();

	}

	push(event) {
		let eventId = event && typeof event === 'object' && 'id' in event ? event.id : event;
		if (!this.blockedTypes.has(eventId)) {
			this.queue.push(event);
		}
	}

	getEventId(name) {
		if (Object.keys(this.nameList).includes(name)) {
			return this.nameList[name];
		} else {
			throw new Error("Unknown event name");
		}
	}

	getEventName(id) {
		if (Object.values(this.nameList).includes(id)) {
			return Object.keys(this.nameList).find(key => this.nameList[key] === id);
		} else {
			throw new Error("Unknown event id");
		}
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
	
		return this.queue[eventType] && true || false 
	}

    clear(eventType = undefined) {
        if (eventType === undefined) {
            this.queue.length = 0;
        } else {
            const types = Array.isArray(eventType) ? eventType : [eventType];
            this.queue = this.queue.filter(event => !types.includes(event));
        }
    }

    setBlocked(eventType = undefined) {
        if (eventType === undefined || eventType === null) {
            Object.values(this.nameList).forEach(id => this.blockedTypes.add(id));
        } else if (Array.isArray(eventType)) {
            eventType.forEach(type => this.blockedTypes.add(type));
        } else {
            this.blockedTypes.add(eventType);
        }
    }

    setAllowed(eventType = undefined) {
        if (eventType === undefined || eventType === null) {
            this.blockedTypes.clear();
        } else if (Array.isArray(eventType)) {
            eventType.forEach(type => this.blockedTypes.delete(type));
        } else {
            this.blockedTypes.delete(eventType);
        }
    }

    getBlocked(eventType) {
        if (eventType === undefined || eventType === null) {
            return false;
        }
        if (Array.isArray(eventType)) {
            return eventType.some(type => this.blockedTypes.has(type));
        }
        return this.blockedTypes.has(eventType);
    }
}
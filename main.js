import { jsgame } from "./src/jsgame.js";

const surface = jsgame.init();

const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const size = 25;

let angle = -Math.PI / 2;
let speed = 0;

const maxSpeed = 8;
const acceleration = 0.2;
const braking = 0.3;
const turnSpeed = 0.05;
const drag = 0.985;

function trianglePoints() {
	const nose = [pos.x + size * Math.cos(angle), pos.y + size * Math.sin(angle)];
	const backLeft = [pos.x + size * Math.cos(angle + 2.5), pos.y + size * Math.sin(angle + 2.5)];
	const backRight = [pos.x + size * Math.cos(angle - 2.5), pos.y + size * Math.sin(angle - 2.5)];
	return [nose, backLeft, backRight];
}

function update() {
	const keys = jsgame.key.getPressed();
	if (keys.KeyW) speed = Math.min(speed + acceleration, maxSpeed);
	if (keys.KeyS) speed = Math.max(speed - braking, 0);
	if (keys.KeyA) angle -= turnSpeed;
	if (keys.KeyD) angle += turnSpeed;

	speed *= drag;

	pos.x += Math.cos(angle) * speed;
	pos.y += Math.sin(angle) * speed;
}

function render() {
	surface.clearRect(0, 0, window.innerWidth, window.innerHeight);
	jsgame.draw.polygon(surface, "#FF0000", trianglePoints());
}

function loop() {
	update();
	render();
	requestAnimationFrame(loop);
}

loop();

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

const bulletSpeed = 10;
const bulletSize = 6;
const bulletLifetime = 5000;

let prevSpace = false;
const bullets = [];

function triangleAt(offsetX, offsetY) {
	const x = pos.x + offsetX;
	const y = pos.y + offsetY;
	const nose = [x + size * Math.cos(angle), y + size * Math.sin(angle)];
	const backLeft = [x + size * Math.cos(angle + 2.5), y + size * Math.sin(angle + 2.5)];
	const backRight = [x + size * Math.cos(angle - 2.5), y + size * Math.sin(angle - 2.5)];
	return [nose, backLeft, backRight];
}

function update() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const keys = jsgame.key.getPressed();

	if (keys.KeyW) speed = Math.min(speed + acceleration, maxSpeed);
	if (keys.KeyS) speed = Math.max(speed - braking, 0);
	if (keys.KeyA) angle -= turnSpeed;
	if (keys.KeyD) angle += turnSpeed;

	speed *= drag;

	if (keys.Space && !prevSpace) {
		const tipX = pos.x + size * Math.cos(angle);
		const tipY = pos.y + size * Math.sin(angle);
		bullets.push({
			x: tipX,
			y: tipY,
			vx: Math.cos(angle) * bulletSpeed,
			vy: Math.sin(angle) * bulletSpeed,
			expires: performance.now() + bulletLifetime
		});
	}
	prevSpace = keys.Space;

	const now = performance.now();
	for (let i = bullets.length - 1; i >= 0; i--) {
		const bullet = bullets[i];
		bullet.x += bullet.vx;
		bullet.y += bullet.vy;
		if (bullet.x < 0) bullet.x += w;
		else if (bullet.x > w) bullet.x -= w;
		if (bullet.y < 0) bullet.y += h;
		else if (bullet.y > h) bullet.y -= h;
		if (bullet.expires < now) bullets.splice(i, 1);
	}

	pos.x += Math.cos(angle) * speed;
	pos.y += Math.sin(angle) * speed;

	if (pos.x < 0) pos.x += w;
	else if (pos.x > w) pos.x -= w;
	if (pos.y < 0) pos.y += h;
	else if (pos.y > h) pos.y -= h;
}

function render() {
	const w = window.innerWidth;
	const h = window.innerHeight;

	surface.clearRect(0, 0, w, h);

	for (const bullet of bullets) {
		jsgame.draw.rect(surface, "#ff0000", new jsgame.core.Rect(
			bullet.x - bulletSize / 2, bullet.y - bulletSize / 2, bulletSize, bulletSize
		));
	}

	jsgame.draw.polygon(surface, "#FF0000", triangleAt(0, 0));

	if (pos.x < size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(w, 0));
	if (pos.x > w - size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(-w, 0));
	if (pos.y < size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(0, h));
	if (pos.y > h - size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(0, -h));

	if (pos.x < size && pos.y < size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(w, h));
	if (pos.x < size && pos.y > h - size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(w, -h));
	if (pos.x > w - size && pos.y < size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(-w, h));
	if (pos.x > w - size && pos.y > h - size) jsgame.draw.polygon(surface, "#FF0000", triangleAt(-w, -h));
}

function loop() {
	jsgame.event.clear();
	update();
	render();
	requestAnimationFrame(loop);
}

loop();

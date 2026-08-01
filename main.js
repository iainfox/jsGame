import { jsgame } from "./src/jsgame.js";

const surface = jsgame.init();

const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const size = 25;

let angle = -Math.PI / 2;
let speed = 0;

const maxSpeed = 8;
const reverseSpeed = 4;
const acceleration = 0.2;
const reverseAccel = 0.1;
const turnSpeed = 0.05;
const drag = 0.985;

const bulletSpeed = 10;
const bulletSize = 4;
const bulletLifetime = 5000;
const fireCooldown = 200;

let prevSpace = false;
let lastShot = 0;
const bullets = [];

const asteroidSizes = {
	large: { radius: 45, points: 20 },
	medium: { radius: 28, points: 50 },
	small: { radius: 15, points: 100 },
};
const asteroidMax = 20;
const spawnInterval = 750;

let asteroids = [];
let lastSpawn = 0;
let score = 0;

const wingSpread = 2.6;
const wingLength = size * 1.5;

function triangleAt(offsetX, offsetY) {
	const x = pos.x + offsetX;
	const y = pos.y + offsetY;
	const nose = [x + size * Math.cos(angle), y + size * Math.sin(angle)];
	const backCenter = [x - size * Math.cos(angle), y - size * Math.sin(angle)];
	const backLeft = [
		x + wingLength * Math.cos(angle + wingSpread),
		y + wingLength * Math.sin(angle + wingSpread),
	];
	const backRight = [
		x + wingLength * Math.cos(angle - wingSpread),
		y + wingLength * Math.sin(angle - wingSpread),
	];
	return [nose, backLeft, backCenter, backRight];
}

function rand(min, max) {
	return min + Math.random() * (max - min);
}

function makeAsteroidShape(radius) {
	const n = 8 + Math.floor(Math.random() * 5);
	const verts = [];
	for (let i = 0; i < n; i++) {
		const a = (i / n) * Math.PI * 2;
		const r = radius * rand(0.7, 1.3);
		verts.push([Math.cos(a) * r, Math.sin(a) * r]);
	}
	return verts;
}

function spawnAsteroid(sizeName, x, y, vx, vy) {
	const radius = asteroidSizes[sizeName].radius * rand(0.8, 1.2);
	asteroids.push({
		x,
		y,
		vx,
		vy,
		sizeName,
		radius,
		rot: rand(0, Math.PI * 2),
		rotSpeed: rand(-0.02, 0.02),
		verts: makeAsteroidShape(radius),
	});
}

function spawnFromEdge() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const radius = asteroidSizes.large.radius;
	const side = Math.floor(Math.random() * 4);
	let x, y;
	if (side === 0) {
		x = -radius;
		y = rand(0, h);
	} else if (side === 1) {
		x = w + radius;
		y = rand(0, h);
	} else if (side === 2) {
		x = rand(0, w);
		y = -radius;
	} else {
		x = rand(0, w);
		y = h + radius;
	}
	const speed = rand(0.5, 1.4);
	const dx = w / 2 - x;
	const dy = h / 2 - y;
	const len = Math.hypot(dx, dy) || 1;
	spawnAsteroid("large", x, y, (dx / len) * speed, (dy / len) * speed);
}

function spawnInitialField() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	for (let i = 0; i < 4; i++) {
		let x, y;
		do {
			x = rand(80, w - 80);
			y = rand(80, h - 80);
		} while (Math.hypot(x - pos.x, y - pos.y) < 200);
		spawnAsteroid("large", x, y, rand(-0.5, 0.5), rand(-0.5, 0.5));
	}
}

function splitAsteroid(a) {
	const childSizes = { large: "medium", medium: "small", small: null };
	const childSize = childSizes[a.sizeName];
	if (childSize === null) return;
	const count = 2 + Math.floor(Math.random() * 2);
	for (let i = 0; i < count; i++) {
		const dir = Math.random() * Math.PI * 2;
		const boost = rand(0.8, 1.8);
		spawnAsteroid(
			childSize,
			a.x,
			a.y,
			a.vx + Math.cos(dir) * boost,
			a.vy + Math.sin(dir) * boost,
		);
	}
}

function checkBulletCollisions() {
	for (let i = bullets.length - 1; i >= 0; i--) {
		const b = bullets[i];
		for (let j = asteroids.length - 1; j >= 0; j--) {
			const a = asteroids[j];
			if (Math.hypot(b.x - a.x, b.y - a.y) < a.radius + bulletSize) {
				bullets.splice(i, 1);
				score += asteroidSizes[a.sizeName].points;
				splitAsteroid(a);
				asteroids.splice(j, 1);
				break;
			}
		}
	}
}

function resetGame() {
	pos.x = window.innerWidth / 2;
	pos.y = window.innerHeight / 2;
	angle = -Math.PI / 2;
	speed = 0;
	bullets.length = 0;
	asteroids.length = 0;
	score = 0;
	lastSpawn = performance.now();
	spawnInitialField();
}

function checkPlayerCollision() {
	for (const a of asteroids) {
		if (Math.hypot(pos.x - a.x, pos.y - a.y) < a.radius + size) {
			resetGame();
			return;
		}
	}
}

function moveAsteroids() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	for (const a of asteroids) {
		a.x += a.vx;
		a.y += a.vy;
		a.rot += a.rotSpeed;
		const r = a.radius;
		if (a.x + r < 0) a.x = w + r;
		else if (a.x - r > w) a.x = -r;
		if (a.y + r < 0) a.y = h + r;
		else if (a.y - r > h) a.y = -r;
	}
}

function spawnAsteroids(now) {
	if (asteroids.length < asteroidMax && now - lastSpawn >= spawnInterval) {
		lastSpawn = now;
		spawnFromEdge();
	}
}

function update() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const keys = jsgame.key.getPressed();

	if (keys.KeyW) speed = Math.min(speed + acceleration, maxSpeed);
	if (keys.KeyS) speed = Math.max(speed - reverseAccel, -reverseSpeed);
	if (keys.KeyA) angle -= turnSpeed;
	if (keys.KeyD) angle += turnSpeed;

	speed *= drag;

	const now = performance.now();

	if (keys.Space && (!prevSpace || now - lastShot >= fireCooldown)) {
		lastShot = now;
		const tipX = pos.x + size * Math.cos(angle);
		const tipY = pos.y + size * Math.sin(angle);
		bullets.push({
			x: tipX,
			y: tipY,
			vx: Math.cos(angle) * bulletSpeed,
			vy: Math.sin(angle) * bulletSpeed,
			expires: now + bulletLifetime,
		});
	}
	prevSpace = keys.Space;
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

	moveAsteroids();
	spawnAsteroids(now);
	checkBulletCollisions();

	pos.x += Math.cos(angle) * speed;
	pos.y += Math.sin(angle) * speed;

	if (pos.x < 0) pos.x += w;
	else if (pos.x > w) pos.x -= w;
	if (pos.y < 0) pos.y += h;
	else if (pos.y > h) pos.y -= h;

	checkPlayerCollision();
}

function render() {
	const w = window.innerWidth;
	const h = window.innerHeight;

	surface.fillStyle = "#000000";
	surface.fillRect(0, 0, w, h);

	for (const bullet of bullets) {
		jsgame.draw.rect(
			surface,
			"#FFFFFF",
			new jsgame.core.Rect(
				bullet.x - bulletSize / 2,
				bullet.y - bulletSize / 2,
				bulletSize,
				bulletSize,
			),
		);
	}

	for (const a of asteroids) {
		drawAsteroid(a);
	}

	jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(0, 0), 2);

	if (pos.x < size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(w, 0), 2);
	if (pos.x > w - size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(-w, 0), 2);
	if (pos.y < size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(0, h), 2);
	if (pos.y > h - size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(0, -h), 2);

	if (pos.x < size && pos.y < size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(w, h), 2);
	if (pos.x < size && pos.y > h - size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(w, -h), 2);
	if (pos.x > w - size && pos.y < size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(-w, h), 2);
	if (pos.x > w - size && pos.y > h - size)
		jsgame.draw.polygon(surface, "#FFFFFF", triangleAt(-w, -h), 2);

	surface.font = "20px monospace";
	surface.textAlign = "left";
	surface.textBaseline = "top";
	surface.fillStyle = "#FFFFFF";
	surface.fillText(`Score: ${score}`, 10, 10);
}

function drawAsteroid(a) {
	const verts = a.verts.map((v) => [
		a.x + v[0] * Math.cos(a.rot) - v[1] * Math.sin(a.rot),
		a.y + v[0] * Math.sin(a.rot) + v[1] * Math.cos(a.rot),
	]);
	jsgame.draw.polygon(surface, "#FFFFFF", verts, 1);
}

function loop() {
	jsgame.event.clear();
	update();
	render();
	requestAnimationFrame(loop);
}

spawnInitialField();
lastSpawn = performance.now();
loop();

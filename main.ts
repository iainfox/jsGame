import { jsgame } from "./src/jsgame.js"

const canvas = document.getElementById("canvas")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const surface = canvas.getContext('2d')

let points = [
	[25, 20],
	[80, 26],
	[180, 80],
]

jsgame.draw.lines(surface, "#FF0000", true, points, 1)

jsgame.draw.ellipse(surface, "#FF0000", new jsgame.core.Rect([325, 80], [120, 60]), 0)
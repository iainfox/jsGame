import { core } from "../../core/core.ts";
import { Color } from "../../core/color.ts";

export function arc(
    ctx: CanvasRenderingContext2D,
    color: Color | string | number[] = new Color(0, 0, 0),
    rect: { left: number; top: number; width: number; height: number },
    startAngle: number,
    stopAngle: number,
    width: number = 1
) {
    let colorObj: Color;
    if (color instanceof Color) {
        colorObj = color;
    } else if (typeof color === "string") {
        colorObj = new Color(color);
    } else if (Array.isArray(color)) {
        if (color.length === 3) {
            colorObj = new Color(color[0], color[1], color[2]);
        } else if (color.length === 1 && typeof color[0] === "string") {
            colorObj = new Color(color[0]);
        } else {
            colorObj = new Color(0, 0, 0);
        }
    } else {
        colorObj = new Color(0, 0, 0);
    }

    if (width <= 0) {
        return new core.Rect([rect.left, rect.top], [0, 0]);
    }

    ctx.lineWidth = width;
    ctx.fillStyle = colorObj.hex3;
    ctx.strokeStyle = colorObj.hex3;

    ctx.beginPath();
    ctx.arc(
        rect.left,
        rect.top,
        rect.width,
        startAngle,
        stopAngle
    );
    ctx.stroke();

    return new core.Rect([rect.left, rect.top], [rect.width, rect.height]);
}

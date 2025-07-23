import { assertEquals } from "@std/assert";
import { draw } from "../src/draw/draw.ts";

Deno.test("draw exports shape functions", () => {
  const drawObj = draw as Record<string, unknown>;
  ["rect", "line", "lines", "circle", "polygon", "ellipse"].forEach(fn => {
    if (!(fn in drawObj)) throw new Error(`Missing draw function: ${fn}`);
    // Should be a function
    if (typeof drawObj[fn] !== "function") throw new Error(`${fn} is not a function`);
  });
}); 
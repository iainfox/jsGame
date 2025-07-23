import { assertEquals } from "@std/assert";
import { core } from "../src/core/core.ts";
import { Rect } from "../src/core/Rect.ts";
import { Color } from "../src/core/color.ts";

Deno.test("core exports Rect and Color", () => {
  assertEquals(core.Rect, Rect);
  assertEquals(core.Color, Color);
}); 
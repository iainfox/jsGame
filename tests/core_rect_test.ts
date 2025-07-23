import { assertEquals, assertThrows } from "@std/assert";
import { Rect } from "../src/core/Rect.ts";

Deno.test("Rect: construct from 4 numbers", () => {
  const r = new Rect(1, 2, 3, 4);
  assertEquals(r.left, 1);
  assertEquals(r.top, 2);
  assertEquals(r.width, 3);
  assertEquals(r.height, 4);
});

Deno.test("Rect: construct from two [x, y] arrays", () => {
  const r = new Rect([5, 6], [7, 8]);
  assertEquals(r.left, 5);
  assertEquals(r.top, 6);
  assertEquals(r.width, 7);
  assertEquals(r.height, 8);
});

Deno.test("Rect: construct from object", () => {
  const r = new Rect({ left: 9, top: 10, width: 11, height: 12 });
  assertEquals(r.left, 9);
  assertEquals(r.top, 10);
  assertEquals(r.width, 11);
  assertEquals(r.height, 12);
});

Deno.test("Rect: throws on invalid input", () => {
  assertThrows(() => new Rect([] as any));
  assertThrows(() => new Rect("bad" as any));
}); 
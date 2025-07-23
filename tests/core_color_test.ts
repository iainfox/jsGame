import { assertEquals, assertThrows } from "@std/assert";
import { Color } from "../src/core/color.ts";

Deno.test("Color: construct from RGB", () => {
  const c = new Color(10, 20, 30);
  assertEquals(c.r, 10);
  assertEquals(c.g, 20);
  assertEquals(c.b, 30);
});

Deno.test("Color: construct from 6-digit hex string", () => {
  const c = new Color("#0a141e");
  assertEquals(c.r, 10);
  assertEquals(c.g, 20);
  assertEquals(c.b, 30);
});

Deno.test("Color: construct from 3-digit hex string", () => {
  const c = new Color("#abc");
  assertEquals(c.r, 170);
  assertEquals(c.g, 187);
  assertEquals(c.b, 204);
});

Deno.test("Color: throws on invalid input", () => {
  assertThrows(() => new Color("bad"));
  assertThrows(() => new Color({} as any));
}); 
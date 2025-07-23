import { assertEquals } from "@std/assert";
import { maps } from "../src/IO/keyMap.ts";

Deno.test("maps.KeyMap contains Enter and ArrowUp", () => {
  assertEquals(typeof maps.KeyMap["Enter"], "string");
  assertEquals(typeof maps.KeyMap["ArrowUp"], "string");
});

Deno.test("maps.ModKeyMap contains ShiftLeft and AltRight", () => {
  assertEquals(typeof maps.ModKeyMap["ShiftLeft"], "string");
  assertEquals(typeof maps.ModKeyMap["AltRight"], "string");
}); 
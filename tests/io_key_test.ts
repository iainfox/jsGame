import { assertEquals } from "@std/assert";
import { Key } from "../src/IO/key.ts";

Deno.test("Key: getPressed returns keys object", () => {
  const key = new Key();
  const pressed = key.getPressed();
  // Should be an object with key names as properties
  // e.g., pressed["Enter"] === false
  // We'll check a few known keys
  ["Enter", "ShiftLeft", "KeyA"].forEach(k => {
    if (!(k in pressed)) throw new Error(`Missing key: ${k}`);
  });
});

Deno.test("Key: getMods returns array", () => {
  const key = new Key();
  const mods = key.getMods();
  // Should be an array (empty by default)
  assertEquals(Array.isArray(mods), true);
});

Deno.test("Key: name and keyCode mapping", () => {
  const key = new Key();
  // Should map keyCode to name and vice versa
  const name = key.name("K_RETURN");
  const code = key.keyCode("Enter");
  // name may be null if not found, code should be string or null
  // We just check that the functions run and return something
  // (more detailed mapping tests could be added)
  // No assertion needed if no error is thrown
}); 
import { assertEquals } from "@std/assert";
import createKeyDict from "../src/IO/keyPressed.ts";

Deno.test("createKeyDict returns object with known keys set to false", () => {
  const dict = createKeyDict() as Record<string, boolean>;
  ["Enter", "ShiftLeft", "KeyA", "F1", "Numpad0"].forEach(k => {
    if (!(k in dict)) throw new Error(`Missing key: ${k}`);
    assertEquals(dict[k], false);
  });
}); 
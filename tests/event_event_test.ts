import { assertEquals, assertThrows } from "@std/assert";
import { event } from "../src/event/event.ts";

Deno.test("event: getEventId and getEventName", () => {
  const ev = new event();
  const id = ev.getEventId("QUIT");
  assertEquals(typeof id, "number");
  const name = ev.getEventName(id);
  assertEquals(name, "QUIT");
});

Deno.test("event: getEventId throws on unknown name", () => {
  const ev = new event();
  assertThrows(() => ev.getEventId("NOT_AN_EVENT"));
});

Deno.test("event: getEventName throws on unknown id", () => {
  const ev = new event();
  assertThrows(() => ev.getEventName(-1));
}); 
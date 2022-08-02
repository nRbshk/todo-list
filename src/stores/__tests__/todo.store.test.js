import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useTodoStore } from "@/stores/todo.js";

describe("Todo Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });
  it("check default state", () => {
    const store = useTodoStore();
    expect(store.items.length).toBe(1);
    expect(store.id).toBe(1);
  });
  it("check methods", () => {
    const store = useTodoStore();
    store.add("Your second todo item");
    expect(store.items.length).toBe(2);
    expect(store.id).toBe(2);
    expect(store.items[1]).include({ text: "Your second todo item", completed: false, id: 1 });

    store.remove({ text: "Your first todo item", completed: false, id: 0 });
    expect(store.items.length).toBe(1);
    expect(store.id).toBe(2);
    expect(store.items[0]).include({ text: "Your second todo item", completed: false, id: 1 });

    store.update({ text: "Your updated second todo item", completed: true, id: 1 });

    expect(store.items.length).toBe(1);
    expect(store.id).toBe(2);
    expect(store.items[0]).include({ text: "Your updated second todo item", completed: true, id: 1 });

    store.update({ text: "Your not existed todo item", completed: true, id: 3 });
    expect(store.items.length).toBe(1);
  });
});

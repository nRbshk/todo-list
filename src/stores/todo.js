import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    items: [{ text: "Your first todo item", completed: false, id: 0 }],
    id: 1,
  }),
  getters: {
    active() {
      return this.items.filter((i) => !i.completed);
    },
    completed() {
      return this.items.filter((i) => i.completed);
    },
  },
  actions: {
    add(text) {
      this.items.push({ text, completed: false, id: this.id++ });
    },
    update(todo) {
      const updateIndex = this.items.findIndex((i) => i.id == todo.id);
      if (updateIndex < 0) return;
      this.items[updateIndex] = todo;
    },
    remove(todo) {
      this.items = this.items.filter((i) => i.id != todo.id);
    },
  },
});

import { defineStore } from "pinia";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    items: [
      {
        text: "This is your first todo item",
        completed: false,
        id: 0,
      },
    ],
    id: 0,
  }),
  getters: {
    uncompleted() {
      return this.items.filter((i) => !i.completed);
    },
  },
  actions: {
    addTodo(text) {
      const newTodo = {
        text,
        completed: false,
        id: this.id++,
      };
      this.items.push(newTodo);
      return newTodo;
    },
    completeTodo(index) {
      this.items[index].completed = true;
      return this.items[index];
    },
  },
});

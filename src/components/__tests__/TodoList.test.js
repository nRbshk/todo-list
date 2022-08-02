import { mount } from "@vue/test-utils";

import { beforeEach, describe, expect, it } from "vitest";

import TodoList from "@/components/TodoList.vue";

const todos = [
  { text: "First todo example", id: 0, completed: false },
  { text: "Second todo example", id: 1, completed: false },
  { text: "Third todo example", id: 2, completed: true },
];

describe("TodoList.test.js vitest", () => {
  beforeEach(() => {
    expect(TodoList).toBeTruthy();
  });
  it("check default state", () => {
    const wrapper = mount(TodoList, { props: { todos: [] } });
    expect(wrapper.text()).toBe("");
  });
  it("check non empty todos", () => {
    const wrapper = mount(TodoList, {
      props: { todos: todos },
    });
    wrapper.findAll("[data-testid=todo-item]").forEach((todoItem, index) => {
      expect(todoItem.get("[data-testid=todo-text]").text()).toBe(todos[index].text);
      const todoCheckbox = todoItem.get("[data-testid=todo-checkbox]");
      expect(todoCheckbox.get(todos[index].completed ? "svg" : "div")).toBeTruthy();
      expect(todoItem.get("[data-testid=todo-remove]")).toBeTruthy();
      // check classes on completed todo item
      if (todos[index].completed)
        expect(todoItem.get("[data-testid=todo-checkbox] svg").classes()).toEqual(
          expect.arrayContaining(["bg-purple-600", "text-white"])
        );
    });
  });
});

describe("TodoList.test.js vitest emitted events", () => {
  it("should listen event", async () => {
    const wrapper = mount(TodoList, { props: { todos: todos } });
    const todoItems = wrapper.findAll("[data-testid=todo-item]");
    // using for loop for async methods as DOM update async
    for (let index = 0; index < todoItems.length; index++) {
      const todoItem = todoItems[index];
      const todoCheckbox = todoItem.get("[data-testid=todo-checkbox]").get(todos[index].completed ? "svg" : "div");
      await todoCheckbox.trigger("click");
      // toggle event
      const onToggleEvent = wrapper.emitted("toggle");
      expect(onToggleEvent).toHaveLength(index + 1);
      expect(onToggleEvent[index]).toEqual([
        {
          text: todos[index].text,
          id: todos[index].id,
          completed: !todos[index].completed,
        },
      ]);

      // remove event
      const todoRemove = todoItem.get("[data-testid=todo-remove] svg");
      await todoRemove.trigger("click");
      const onRemoveEvent = wrapper.emitted("remove");
      expect(onRemoveEvent).toHaveLength(index + 1);
      expect(onRemoveEvent[index]).toEqual([todos[index]]);
    }
  });
});

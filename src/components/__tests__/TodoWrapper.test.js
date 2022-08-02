import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";

import { beforeEach, describe, expect, it } from "vitest";

import { useTodoStore } from "@/stores/todo";
import TabsPanel from "@/components/TabsPanel.vue";
import TodoWrapper from "@/components/TodoWrapper.vue";

const ALL = 0;
const ACTIVE = 1;
const COMPLETED = 2;
const TABS = [ALL, ACTIVE, COMPLETED];

describe("TodoWrapper.test.js vitest", () => {
  it("check default state", () => {
    const wrapper = mount(TodoWrapper, {
      global: { plugins: [createTestingPinia({ stubActions: false })] },
      props: {},
    });
    const todoStore = useTodoStore();
    const newTodoTextInput = wrapper.get("[data-testid=new-todo-form] input");
    const addButton = wrapper.get("[data-testid=new-todo-form] button");
    expect(newTodoTextInput).toBeTruthy();
    expect(addButton).toBeTruthy();
    expect(todoStore.items).toHaveLength(1);
    expect(todoStore.id).toBe(1);
    expect(wrapper.findComponent(TabsPanel)).toBeTruthy();
  });
});
describe("TodoWrapper.test.js vitest behavioral", async () => {
  let wrapper = null;
  let newTodoTextInput = null;
  let addButton = null;
  let todoStore = null;
  let tabButtons = null;
  beforeEach(() => {
    wrapper = mount(TodoWrapper, { global: { plugins: [createTestingPinia({ stubActions: false })] }, props: {} });
    todoStore = useTodoStore();
    newTodoTextInput = wrapper.get("[data-testid=new-todo-form] input");
    addButton = wrapper.get("[data-testid=new-todo-form] button");
    tabButtons = wrapper.findAll("[data-testid=tab-button]");
  });
  it("Create new todo and mark it as completed", async () => {
    const newTodoItemText = "Your second todo item created via vitest";
    // craete one new
    await newTodoTextInput.setValue(newTodoItemText);
    await addButton.trigger("click");
    // get all items
    const todoItems = wrapper.findAll("[data-testid=todo-item]");
    expect(todoItems[1].get("[data-testid=todo-text]").text()).toBe(newTodoItemText);
    // complete new created todo
    const completeCheckbox = todoItems[1].get("[data-testid=todo-checkbox] div");
    await completeCheckbox.trigger("click");
    expect(wrapper.findAll("[data-testid=todo-item]")).toHaveLength(2);
    expect(todoStore.update).toHaveBeenCalledTimes(1);
    // switch tab to Completed
    await tabButtons[COMPLETED].trigger("click");
    // expect only one completed item
    const completedTodos = wrapper.findAll("[data-testid=todo-item]");
    expect(completedTodos).toHaveLength(1);
    expect(todoStore.completed).toEqual([{ text: newTodoItemText, id: 1, completed: true }]);
  });
  it("Create new todo and removes it", async () => {
    const newTodoItemText = "Your second todo item create via vitest";
    // craete one new
    await newTodoTextInput.setValue(newTodoItemText);
    await addButton.trigger("click");
    // get all items
    const todoItems = wrapper.findAll("[data-testid=todo-item]");
    expect(todoItems[1].get("[data-testid=todo-text]").text()).toBe(newTodoItemText);
    // remove new created todo
    await todoItems[1].get("[data-testid=todo-remove] svg").trigger("click");
    expect(wrapper.findAll("[data-testid=todo-item]")).toHaveLength(1);
    expect(todoStore.remove).toHaveBeenCalledTimes(1);
  });
  it("Switch the tabs and check it todo items", async () => {
    // preload some todos
    const newTodos = [
      { text: "First todo", completed: false, id: 0 },
      { text: "Second todo", completed: false, id: 1 },
      { text: "Third todo", completed: true, id: 2 },
      { text: "Fourth todo", completed: true, id: 3 },
      { text: "Fifth todo", completed: false, id: 4 },
    ];
    todoStore.items = newTodos;
    for (let currentTabIndex = ALL; currentTabIndex < TABS.length; currentTabIndex++) {
      await tabButtons[currentTabIndex].trigger("click");
      const todoItems = wrapper.findAll("[data-testid=todo-remove]");
      switch (currentTabIndex) {
        case ALL:
          expect(todoItems).toHaveLength(newTodos.length);
          break;
        case ACTIVE:
          expect(todoItems).toHaveLength(newTodos.filter((t) => !t.completed).length);
          break;
        case COMPLETED:
          expect(todoItems).toHaveLength(newTodos.filter((t) => t.completed).length);
          break;
      }
    }
  });
});

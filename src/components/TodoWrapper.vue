<script setup>
import { ref } from "vue";

import { useTodoStore } from "@/stores/todo.js";
import TabsPanel from "@/components/TabsPanel.vue";
import TodoList from "@/components/TodoList.vue";

const todoStore = useTodoStore();

const newTodoText = ref("");

const onAddTodo = () => {
  if (newTodoText.value == "") return;
  todoStore.add(newTodoText.value);
  // newTodoText.value = "";
};
const onToggleCompleteTodo = (todo) => todoStore.update(todo);
const onRemoveTodo = (todo) => todoStore.remove(todo);
</script>
<template>
  <div
    class="flex h-16 w-6/12 justify-center rounded-md bg-white p-4 focus-within:outline focus-within:outline-1 focus-within:outline-purple-700"
    data-testid="new-todo-form"
  >
    <input v-model="newTodoText" placeholder="Wanna make..." class="flex-1 rounded-md py-2 outline-none" />
    <button
      tabindex="0"
      class="w-1/12 rounded-md bg-purple-600 text-white transition-all duration-75 ease-linear hover:bg-purple-700 active:bg-purple-800"
      title="Add"
      @click="onAddTodo"
    >
      Add
    </button>
  </div>
  <div class="w-full border-b-2 py-2" />
  <TabsPanel class="flex max-h-[100%] w-full flex-col" :tabs="['All', 'Active', 'Completed']">
    <template #All>
      <TodoList :todos="todoStore.items" @remove="onRemoveTodo" @toggle="onToggleCompleteTodo" />
    </template>
    <template #Active>
      <TodoList :todos="todoStore.active" @remove="onRemoveTodo" @toggle="onToggleCompleteTodo" />
    </template>
    <template #Completed>
      <TodoList :todos="todoStore.completed" @remove="onRemoveTodo" @toggle="onToggleCompleteTodo" />
    </template>
  </TabsPanel>
</template>

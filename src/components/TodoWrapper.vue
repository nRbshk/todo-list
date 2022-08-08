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
  <div class="w-full">
    <form
      class="mt-20 flex h-16 w-full rounded-md bg-white p-2 outline outline-1 outline-purple-700"
      data-testid="new-todo-form"
      @submit.prevent="onAddTodo"
    >
      <input v-model="newTodoText" placeholder="Wanna make..." class="flex-1 rounded-md py-2 outline-none" />
      <button
        type="submit"
        class="ml-4 w-[10%] rounded-md bg-purple-500 text-white transition-all ease-linear hover:bg-pink-500"
        title="Add"
      >
        Add
      </button>
    </form>
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
  </div>
</template>

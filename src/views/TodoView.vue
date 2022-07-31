<script setup>
import { useTodoStore } from "@/stores/todo.js";
import TodoList from "@/components/TodoList.vue";

const todoStore = useTodoStore();

const todos = todoStore.uncompleted;
</script>
<template>
  <main>
    <TodoList :todos="todos" />
  </main>
</template>

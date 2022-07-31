<script setup>
import { ref } from "vue";

const props = defineProps(["todos"]);
const emits = defineEmits(["addTodo", "completeTodo"]);
const newTodoText = ref("");

const onAddTodo = () => emits("addTodo", { text: newTodoText.value });
const onMarkCompleteTodo = (index) => emits("completeTodo", { index: index });
</script>
<template>
  <div
    class="flex h-16 w-8/12 justify-center rounded-md bg-white p-4 focus-within:outline focus-within:outline-1 focus-within:outline-purple-700"
  >
    <input v-model="newTodoText" placeholder="Wanna make..." class="flex-1 rounded-md py-2 outline-none" />
    <button
      tabindex="0"
      class="w-1/12 rounded-md bg-purple-600 text-white transition-all duration-75 ease-linear hover:bg-purple-700 active:bg-purple-800"
      @click="onAddTodo"
    >
      Add
    </button>
  </div>
  <div class="flex flex-col py-4">
    <div v-for="(todo, index) of todos" :key="todo.id">{{ index }} {{ todo.text }}</div>
  </div>
</template>

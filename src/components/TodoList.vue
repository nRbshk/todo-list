<script setup>
import { CheckIcon, XIcon } from "@heroicons/vue/outline";

const props = defineProps(["todos"]);
const emits = defineEmits(["toggle", "remove"]);

const onToggleComplete = (todo) => {
  emits("toggle", {
    text: todo.text,
    id: todo.id,
    completed: !todo.completed,
  });
};
const onRemove = (todo) => emits("remove", todo);
</script>

<template>
  <div class="fancy-scrollbar overflow-y-auto rounded-md" style="height: calc(100vh - 14rem)">
    <span v-if="!props.todos.length" class="my-2 flex h-16 gap-4 rounded-md bg-white p-4">No todos</span>
    <div
      v-for="todo of props.todos"
      :key="todo.id"
      class="my-2 flex gap-4 rounded-md bg-white p-4"
      data-testid="todo-item"
    >
      <!-- wrap svg elements on div for attribute data-testid -->
      <form class="flex" data-testid="todo-checkbox" @submit.prevent="onToggleComplete(todo)">
        <button type="submit">
          <component
            :is="todo.completed ? CheckIcon : 'div'"
            class="h-8 w-8 cursor-pointer rounded-md border-2 transition-all active:bg-pink-500"
            :class="{ 'bg-purple-500 text-white': todo.completed }"
          >
          </component>
        </button>
      </form>
      <span data-testid="todo-text" class="flex-grow transition-all" :class="todo.completed ? 'line-through' : ''">
        {{ todo.text }}
      </span>
      <button
        data-testid="todo-remove"
        class="h-8 w-8 min-w-[2rem] self-center rounded-md bg-purple-500 text-white transition-all ease-linear hover:bg-pink-500"
        title="Remove"
        @click="onRemove(todo)"
      >
        <XIcon class="p-1" />
      </button>
    </div>
  </div>
</template>

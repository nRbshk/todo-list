<script setup>
import { CheckIcon, TrashIcon } from "@heroicons/vue/outline";

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
  <div class="fancy-scrollbar overflow-y-auto">
    <div v-for="todo of props.todos" :key="todo.id" class="flex items-start gap-2 p-2" data-testid="todo-item">
      <!-- wrap svg elements on div for attribute data-testid -->
      <div data-testid="todo-checkbox">
        <component
          :is="todo.completed ? CheckIcon : 'div'"
          class="h-8 w-8 cursor-pointer rounded-md border-2 transition-all duration-300 active:bg-purple-800"
          :class="{ 'bg-purple-600 text-white': todo.completed }"
          @click="onToggleComplete(todo)"
        />
      </div>
      <span data-testid="todo-text" class="flex-grow transition-all" :class="todo.completed ? 'line-through' : ''">
        {{ todo.text }}
      </span>
      <div data-testid="todo-remove">
        <TrashIcon
          class="h-6 w-6 cursor-pointer rounded-md hover:text-purple-700 active:text-purple-700"
          title="Remove"
          @click="onRemove(todo)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const todos = ref([
	{
		text: "First todo",
		id: 0,
	},
]);
</script>

<template>
	<div v-for="(todo, index) of todos" :key="todo.id">{{ index }} {{ todo.text }}</div>
</template>

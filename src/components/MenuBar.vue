<script setup>
import { RouterLink } from "vue-router";

const menuItems = [
  {
    name: "Todo",
    path: "/",
  },
];

const usedLibraries = [
  { icon: "/vue.svg", link: "https://vuejs.org/" },
  { icon: "/pinia.svg", link: "https://pinia.vuejs.org/" },
  { icon: "/tailwind.svg", link: "https://tailwindcss.com/" },
  { icon: "/vitejs.svg", link: "https://vitejs.dev/" },
  { icon: "/vitest.svg", link: "https://vitest.dev/" },
];
</script>
<template>
  <div class="flex gap-2">
    <span>Design with</span>
    <a v-for="library of usedLibraries" :key="library" :href="library.link">
      <img :src="library.icon" class="h-8 w-8 transition-all active:scale-110" :alt="library.link" />
    </a>
  </div>
  <div class="flex-1" />
  <nav class="flex gap-4 px-4">
    <div v-for="item in menuItems" :key="item" class="transition-all hover:text-black active:scale-110">
      <router-link :to="item.path"> {{ item.name }}</router-link>
    </div>
  </nav>
  <div class="border-l-[1px] border-stone-400 px-2 before:content-['\200b']" />
  <a href="https://github.com/nRbshk/todo-list" class="transition-all active:scale-110">
    <img src="/github.svg" />
  </a>
</template>

<style scoped></style>

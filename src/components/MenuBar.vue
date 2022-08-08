<script setup>
const usedLibraries = [
  { icon: "/vue.svg", link: "https://vuejs.org/" },
  { icon: "/pinia.svg", link: "https://pinia.vuejs.org/" },
  { icon: "/tailwind.svg", link: "https://tailwindcss.com/" },
  { icon: "/vitejs.svg", link: "https://vitejs.dev/" },
  { icon: "/vitest.svg", link: "https://vitest.dev/" },
];
</script>
<template>
  <div class="flex flex-1 justify-between align-middle">
    <div class="flex items-center">
      <span class="mr-4">Designed with</span>
      <a v-for="(library, index) of usedLibraries" :key="library" :href="library.link">
        <img
          :src="library.icon"
          class="h-12 w-12 bg-white px-2 transition-all hover:scale-110 hover:bg-transparent"
          :alt="library.link"
          :class="{ 'rounded-l-md': index == 0, 'rounded-r-md': index == usedLibraries.length - 1 }"
        />
      </a>
    </div>
    <div class="flex items-center">
      <div class="flex-1" />
      <div class="border-l-[1px] border-stone-400 px-2 before:content-['\200b']" />
      <a href="https://github.com/nRbshk/todo-list" class="rounded-full bg-white transition-all hover:scale-110">
        <img src="/github.svg" class="h-12 w-12 p-1" />
      </a>
    </div>
  </div>
</template>

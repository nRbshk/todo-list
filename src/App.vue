<script setup>
import MenuBar from "@/components/MenuBar.vue";
import TodoWrapper from "@/components/TodoWrapper.vue";
</script>

<template>
  <header>
    <div class="content-wrapper">
      <MenuBar />
    </div>
  </header>
  <main>
    <div class="content-wrapper">
      <TodoWrapper />
    </div>
  </main>
</template>

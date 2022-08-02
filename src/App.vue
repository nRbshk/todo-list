<script setup>
import { RouterView } from "vue-router";

import MenuBar from "@/components/MenuBar.vue";
</script>

<template>
  <header>
    <MenuBar />
  </header>
  <RouterView />
</template>

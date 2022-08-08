<script setup>
import { ref } from "vue";

const props = defineProps(["tabs"]);

const currentTab = ref(props.tabs[0]);

const onTabSelect = (tab) => (currentTab.value = tab);
</script>
<template>
  <div class="inline-block rounded-md bg-gradient-to-r from-purple-500 to-pink-500">
    <button
      v-for="(tab, index) in props.tabs"
      :key="tab"
      class="py-4 px-16 text-white transition-all hover:bg-slate-500 hover:bg-opacity-50"
      :class="{
        'rounded-l-md': index == 0,
        'rounded-r-md': index == props.tabs.length,
        'bg-slate-500': tab == currentTab,
      }"
      data-testid="tab-button"
      @click="onTabSelect(tab)"
    >
      {{ tab }}
    </button>
  </div>
  <slot :name="currentTab" />
</template>

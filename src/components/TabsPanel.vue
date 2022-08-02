<script setup>
import { ref } from "vue";

const props = defineProps(["tabs"]);

const currentTab = ref(props.tabs[0]);

const onTabSelect = (tab) => (currentTab.value = tab);
</script>
<template>
  <div>
    <div class="inline-block">
      <button
        v-for="tab in props.tabs"
        :key="tab"
        class="border-b-2 px-4 pt-2 transition-all hover:bg-slate-200"
        :class="{ 'border-purple-600 text-purple-600': currentTab == tab }"
        data-testid="tab-button"
        @click="onTabSelect(tab)"
      >
        {{ tab }}
      </button>
    </div>
    <slot :name="currentTab" />
  </div>
</template>

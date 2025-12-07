<script setup lang="ts">
interface Props {
  title: string;
  value: string;
  change: number;
  icon: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-white rounded-lg p-6 border border-border border-gray-50 shadow-sm">
    <div class="flex flex-row items-center justify-between pb-2">
      <div class="text-sm font-medium text-gray-500">{{ title }}</div>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        <div v-html="icon"></div>
      </div>
    </div>
    <div>
      <div class="text-3xl font-bold text-foreground">{{ value }}</div>
      <div class="flex align-center mt-2 space-y-1 space-x-2 text-xs">
        <div class="mt-1 flex items-center text-xs" v-if="change !== null">
          <svg
              v-if="change >= 0"
              class="h-4 w-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          <svg
              v-else
              class="h-4 w-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
        <div v-if="description" class="mt-2 text-muted-foreground">
          <span class="text-gray-500 text-xs">{{ change >= 0 ? '+' : '' }}{{ change }}% {{ description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
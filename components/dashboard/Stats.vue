<template>
  <div class="bg-white shadow-sm rounded-md px-6 py-5">
    <div class="flex items-center justify-between">
      <div class="flex flex-col">
        <span class="text-xl md:text-2xl font-semibold text-gray-600">{{ TextBox }}</span>
        <span class="text-gray-500 text-sm md:text-md lg:text-md">{{ title }}</span>
      </div>
      <div class="flex items-center rounded-full px-2 py-2" :class="bgIcon">
        <Icon name="mynaui:servers" size="22" :class="IconColor" />
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    bgIcon: String,
    title: String,
    TextBox: Number,
    IconColor: String,
  });
  const { bgIcon, title, TextBox, IconColor } = toRefs(props);
</script>

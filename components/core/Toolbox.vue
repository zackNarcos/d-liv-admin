<template>
  <div
    class="h-36 sm:h-48 flex flex-col justify-center border border-gray-200 hover:bg-blue-50 text-gray-600 hover:border-primary hover:text-primary cursor-pointer rounded-lg text-center p-4 md:p-5 dark:border-gray-700"
  >
    <div class="flex justify-center items-center w-12 h-12 rounded-lg mx-auto">
      <Icon :name="icon" size="52" />
    </div>
    <div class="mt-3">
      <h3 class="md:text-lg text-sm font-medium">
        {{ title }}
      </h3>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(["icon", "title"]);
  const { icon, title } = toRefs(props);
</script>

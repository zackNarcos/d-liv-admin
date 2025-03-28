<script setup>
  const isMinimized = ref(false);
  const route = useRoute();

  const windowWidth = ref(window.innerWidth);
  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener("resize", onWidthChange));

  watch(
    isMinimized,
    (value, oldValue) => {
      if (typeof oldValue == "undefined") {
        isMinimized.value = JSON.parse(localStorage.getItem("isMinimized"));
      }
    },
    { immediate: true },
  );
  watch([() => route.path, () => windowWidth.value], ([path, w]) => {
    if (path.startsWith("/admin/passation-des-marches/procedure-de-passation/")) {
      if (!isMinimized.value && w <= 1280) {
        isMinimized.value = true;
        localStorage.setItem("isMinimized", true);
      }
    }
  });
</script>

<template>
  <div :class="[isMinimized ? 'w-20' : 'w-[272px]', 'bg-white shadow-sm transition-all duration-300 ease-in-out z-20 max-h-screen overflow-y-auto']">
    <MinMenu v-show="isMinimized" v-model:isMinimized="isMinimized" />
    <Menu v-show="!isMinimized" v-model:isMinimized="isMinimized" />
  </div>
</template>

<style scoped>
  div *::-webkit-scrollbar {
    display: none !important;
  }

  div * {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
</style>
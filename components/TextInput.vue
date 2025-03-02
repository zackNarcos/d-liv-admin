<template>
  <div>
    <input
      :id="`input-${placeholder}`"
      v-model="inputComputed"
      :placeholder="placeholder"
      class="block w-full bg-[#fff] text-gray-600 placeholder:text-gray-400 text-sm border border-gray-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      :type="inputType"
      autocomplete="off"
      :maxlength="max"
    />
    <span v-if="error" class="text-red-500 text-[14px] font-semibold">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
  const emit = defineEmits(["update:input"]);
  const props = defineProps(["input", "placeholder", "inputType", "max", "autoFocus", "error"]);
  const { input, placeholder, inputType, max, autoFocus, error } = toRefs(props);

  onMounted(() => {
    if (autoFocus.value) {
      document.getElementById(`input-${placeholder.value}`).focus();
    }
  });

  const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit("update:input", val),
  });

</script>
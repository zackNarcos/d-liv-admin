<template>
  <div class="code-input-container">
    <input
        v-for="(digit, index) in digits"
        :key="index"
        class="code-input"
        type="text"
        maxlength="1"
        @input="onInput($event, index)"
        @keydown.backspace="onBackspace($event, index)"
        v-model="digits[index]"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

const digits = ref(Array(4).fill(''));

const onInput = (event, index) => {
  const value = event.target.value;
  if (isNaN(value)) {
    event.target.value = '';
    return;
  }

  digits.value[index] = value;
  if (index < digits.value.length - 1 && value) {
    event.target.nextElementSibling.focus();
  }

  if (index === digits.value.length - 1 && value) {
    event.target.blur();
  }

  if (index === digits.value.length - 1 && !value) {
    event.target.previousElementSibling.focus();
  }

  emit("update:modelValue", digits.value.join(""));
};

const onBackspace = (event, index) => {
  if (index > 0 && !digits.value[index]) {
    event.target.previousElementSibling.focus();
  }

  emit("update:modelValue", digits.value.join(""));

};

</script>

<style scoped lang="scss">
.code-input-container {
  display: flex;
  justify-content: center;
  gap: 18px;
}

.code-input {
  width: 55px;
  height: 85px;
  text-align: center;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    outline: none;
    @apply border-primary;
  }
}
</style>
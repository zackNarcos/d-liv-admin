<template>
  <div>
    <multiselect
      :id="id"
      :value="props.modelValue"
      :options="options"
      :track-by="trackBy"
      :label="label"
      :multiple="multiple"
      :select-label="selectLabel"
      :placeholder="placeholder"
      :searchable="searchable"
      @input="onChange($event.target.value)"
    />
  </div>
</template>

<script setup>
  import Multiselect from "vue-multiselect";
  import "vue-multiselect/dist/vue-multiselect.css";
  const emit = defineEmits(["update:modelValue", "change"]);

  const props = defineProps({
    options: Array,
    modelValue: String,
    label: String,
    id: String,
    multiple: Boolean,
    trackBy: String,
    taggable: Boolean,
    selectLabel: String,
    placeholder: String,
    searchable: Boolean,
  });

  const onChange = (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  };
</script>

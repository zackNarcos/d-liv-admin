<template>
  <div>
    <label class="sr-only">{{ label }}</label>
    <div class="mt-1 rounded-md">
      <span v-if="prepend" class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-white text-gray-500 text-sm">
        {{ prepend }}
      </span>
      <template v-if="type === 'select'">
        <label :for="label" class="block mb-1 text-sm font-medium text-gray-600">{{ label }}</label>
        <select :name="name" :required="required" :value="props.modelValue" :class="inputClasses" @change="onChange($event.target.value)">
          <option value="">Choisissez</option>
          <option v-for="option of selectOptions" :key="option[valueKey]" :value="option[valueKey]">
            {{ option[text] }}
          </option>
        </select>
      </template>
      <template v-else-if="type === 'textarea'">
        <label :for="label" class="block mb-1 text-sm font-medium text-gray-600">{{ label }}</label>
        <textarea
          :name="name"
          :required="required"
          :value="props.modelValue"
          :class="inputClasses"
          class="!min-h-[110px]"
          :placeholder="label"
          @input="emit('update:modelValue', $event.target.value)"
        ></textarea>
      </template>
      <template v-else-if="type === 'file'">
        <label>
          <input
            :type="type"
            :name="name"
            :required="required"
            :value="props.modelValue"
            :class="inputClasses"
            :placeholder="label"
            @input="emit('change', $event.target.files[0])"
          />
        </label>
      </template>

      <template v-else-if="type === 'iconedFile'">
        <p class="block mb-1 text-sm font-medium text-gray-600">
          <span>{{ label }}</span>
          <span v-if="required" class="text-red-500 text-[18px]">*</span>
        </p>
        <label class="flex justify-between border border-gray-300 min-h-[38px] rounded-md items-center px-3">
          <a :href="props.fileUrl" target="_blank" :class="[fileUrl ? 'text-blue-500 underline' : 'text-gray-600', 'text-sm font-medium line-clamp-1 max-w-[300px]']">{{
            decodeURI(fileName) || "Ajouter un fichier"
          }}</a>
          <input
            type="file"
            class="hidden"
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            @input="emit('change', $event)"
          />
          <slot name="icon" />
        </label>
      </template>

      <template v-else-if="type === 'disabledInput'">
        <label :for="label" class="block mb-1 text-sm font-medium text-gray-600">{{ label }}</label>
        <input type="text" :value="props.modelValue" :class="inputClasses" class="!bg-[#4B465C14] text-gray-600 select-none" disabled />
      </template>

      <template v-else-if="type === 'date'">
        <label :for="label" class="block mb-1 text-sm font-medium text-gray-600">{{ label }}</label>
        <input type="date" :class="inputClasses" :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
      </template>

      <template v-else-if="type === 'checkbox'">
        <div class="flex items-center">
          <input
            :id="id"
            :name="name"
            :type="type"
            :checked="props.modelValue"
            :required="required"
            class="h-4 w-4 text-indigo-600"
            @change="emit('update:modelValue', $event.target.checked)"
          />
          <label :for="id" class="ml-2 block text-sm text-gray-900">
            {{ label }}
          </label>
        </div>
      </template>
      <template v-else>
        <label :for="label" class="block mb-1 text-sm font-medium text-gray-600">{{ label }}</label>
        <input
          :type="type"
          :name="name"
          :required="required"
          :value="props.modelValue"
          :class="inputClasses"
          :placeholder="placeholder"
          step="0.01"
          @input="emit('update:modelValue', $event.target.value)"
        />
      </template>
      <span v-if="append" class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-white text-gray-500 text-sm">
        {{ append }}
      </span>
    </div>
  </div>
</template>
<script setup>
  import { computed, ref } from "vue";

  const props = defineProps({
    modelValue: [String, Number, File],
    label: String,
    placeholder: String,
    fileName: String,
    fileUrl: String,
    type: {
      type: String,
      default: "text",
    },
    name: String,
    required: Boolean,
    prepend: {
      type: String,
      default: "",
    },
    append: {
      type: String,
      default: "",
    },
    selectOptions: Array,
    valueKey: {
      type: String,
      default: "value",
    },
    text: {
      type: String,
      default: "text",
    },
  });

  const id = computed(() => {
    if (props.id) return props.id;

    return `id-${Math.floor(1000000 + Math.random() * 1000000)}`;
  });
  const inputClasses = computed(() => {
    const cls = [
      `block w-full bg-white rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-600 focus:outline-none focus:ring-blue- focus:border-blue- focus:z-10 sm:text-sm`,
    ];

    if (props.append && !props.prepend) {
      cls.push(`rounded-l-md`);
    } else if (props.prepend && !props.append) {
      cls.push(`rounded-r-md`);
    } else if (!props.prepend && !props.append) {
      cls.push("rounded-md");
    }
    return cls.join(" ");
  });
  const emit = defineEmits(["update:modelValue", "change", "delete"]);

  const onChange = (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  };
</script>

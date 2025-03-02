<template>
  <div>
    <Combobox v-model="selectedItem">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-5 text-sm text-gray-700 focus:ring-0"
            :display-value="(item) => item[propertyName]"
            @change="query = $event.target.value"
          />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
              <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </ComboboxButton>
        </div>
        <TransitionRoot leave="transition ease-in duration-100" leave-from="opacity-100" leave-to="opacity-0" @after-leave="query = ''">
          <ComboboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <div v-if="filteredItems.length === 0 && query !== ''" class="relative cursor-default select-none px-4 py-2 text-gray-700">Aucun résultat.</div>

            <ComboboxOption v-for="item in filteredItems" :key="item.uid" v-slot="{ selected, active }" :value="item" as="template" @click="handleItemClick(item)">
              <li
                class="relative cursor-default select-none py-2 pl-3 pr-4"
                :class="[active ? 'bg-primary/25 text-primary' : 'text-gray-700', 'relative cursor-default select-none py-2 pl-2']"
              >
                <span :class="[selected ? 'font-medium text-primary' : 'font-normal', 'block truncate text-gray-700']">
                  {{ item[propertyName] }}
                </span>
                <span v-if="selected" class="absolute inset-y-0 right-2 flex items-center pl-3 text-blue-">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script setup>
  import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, TransitionRoot } from "@headlessui/vue";

  const props = defineProps(["items", "propertyName", "defaultLabel"]);
  const selectedItem = ref(props.defaultLabel ? { [props.propertyName]: props.defaultLabel } : props.items[0]);
  const query = ref("");

  const filteredItems = computed(() =>
    query.value === ""
      ? props.items
      : props.items.filter((item) => item[props.propertyName].toLowerCase().replace(/\s+/g, "").includes(query.value.toLowerCase().replace(/\s+/g, ""))),
  );
  const emit = defineEmits("update:modelValue", "change");
  const handleItemClick = (value) => {
    emit("update:modelValue", value);
    emit("change", value);
  };
</script>

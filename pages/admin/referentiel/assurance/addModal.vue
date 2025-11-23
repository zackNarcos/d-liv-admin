<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-40" @close="closeModal()">
      <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
      </TransitionChild>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div
            class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
        >
          <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
                class="relative bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:max-w-[500px] sm:w-full"
            >
              <Spinner
                  v-if="loading"
                  class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center"
              />
              <header
                  class="relative pt-3 px-4 flex justify-between items-center"
              >
                <button
                    @click="closeModal()"
                    class="absolute bg-white shadow-md -top-2 -right-2 w-8 h-8 flex items-center justify-center text-gray-400 rounded-md transition-colors cursor-pointer hover:bg-primary hover:text-white"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </header>
              <div>
                <div class="bg-white px-6 pt-5 pb-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="col-span-2">
                      <div class="flex border-b border-gray-300 pb-4">
                        <div class="">
                          <h1 class="text-[24px] font-semibold">
                            {{ data.name ? 'Modifier ' : 'Ajouter '}}
                            une assurance
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-2">
                      <label>
                        Nom
                      </label>
                      <VaInput v-model="data.name"
                               placeholder="Renseignez le nom"
                      />
                    </div>
                    <div class="col-span-2">
                      <label>
                        Prix
                      </label>
                      <VaInput v-model="data.price"
                               type="number"
                               placeholder="Renseignez le prix"
                      />
                    </div>
                    <div class="col-span-2">
                      <label>
                        Franchise (%)
                      </label>
                      <VaInput v-model="data.frc"
                               type="number"
                               placeholder="10"
                      />
                    </div>
                    <div class="col-span-2">
                      <label>
                        Description
                      </label>
                      <VaInput v-model="data.description"
                               placeholder="Renseignez la description"
                               rows="3"
                      />
                    </div>
                  </div>
                </div>
                <footer
                    class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                >
                  <button
                      type="submit"
                      :disabled="(!data.name && !data.price && !data.frc && !data.description)"
                      :class="(!data.name && !data.price && !data.frc && !data.description)
                       ? 'bg-primary/50 hover:bg-primary/50'
                       : 'bg-primary hover:bg-primary-light'
                      "
                      class="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md bg-primary hover:bg-primary-light focus:ring-primary"
                      @click="onSubmit"
                  >
                    Enregistrer
                  </button>
                  <button
                      type="button"
                      class="mt-3 w-full inline-flex justify-center font-medium rounded-md shadow-sm px-4 py-2 bg-gray-200 text-gray-600 font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-md"
                      @click="closeModal"
                      ref="cancelButtonRef"
                  >
                    Annuler
                  </button>
                </footer>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {Dialog, DialogPanel, TransitionChild, TransitionRoot,} from "@headlessui/vue";
import Spinner from "~/components/core/Spinner.vue";
import swal from "~/plugins/sweetalert.js";
import {integer} from "@vee-validate/rules";

const props = defineProps({
  modelValue: Boolean,
  data: {
    _id: String,
    name: String,
    price: integer,
    frc: integer,
    description: String,
  }
});
const $swal = swal().provide.swal;
const { $assurancesStore } = useNuxtApp();
const loading = ref(false);
const errors = ref([]);
const emit = defineEmits(["update:modelValue", "close"]);
const show = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const closeModal = () => {
  show.value = false;
  errors.value = [];
  emit("close");
};

const data = ref({
  _id: "",
  name: "",
  price: 0,
  frc: 10,
  description: ""
});

const onSubmit = async () => {
  loading.value = true;
  try {
    if (props.data.name) {
      let dataAdd = {
        _id: data.value._id,
        name: data.value.name,
        price: parseInt(data.value.price),
        frc: parseInt(data.value.frc.toString().replace("%", "")),
        description: data.value.description,
        isActive: true,
      };
      const res = await $assurancesStore.update(dataAdd)
      if (res.status === 200 || res.status === 201) {
        $swal.fire({
          title: "Succès",
          text: "Assurance modifiée avec succès",
          icon: "success",
        });
        closeModal();
      } else {
        $swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite",
          icon: "error",
        });
      }
    } else {
      let dataAdd = {
        name: data.value.name,
        price: parseInt(data.value.price),
        frc: parseInt(data.value.frc.toString().replace("%", "")),
        description: data.value.description,
        isActive: true,
      };
      const res = await $assurancesStore.add(dataAdd);
      if (res.status === 200 || res.status === 201) {
        $swal.fire({
          title: "Succès",
          text: "Assurance crée avec succès",
          icon: "success",
        });
        closeModal();
      } else {
        $swal.fire({
          title: "Erreur",
          text: "Une erreur s'est produite",
          icon: "error",
        });
      }
    }
  } catch (e) {
    // errors.value = e.response?.data.errors;
    $swal.fire({
      title: "Erreur",
      text: "Une erreur s'est produite",
      icon: "error",
    });
  } finally {
    loading.value = false;
  }
};

onUpdated(()=> {
  data.value.name = props.data.name;
  data.value.price = props.data.price;
  data.value.frc = props.data.frc;
  data.value.description = props.data.description;
  data.value._id = props.data._id;
})
</script>

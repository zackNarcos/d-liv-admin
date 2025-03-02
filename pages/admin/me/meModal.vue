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
<!--                <DialogTitle-->
<!--                    as="h3"-->
<!--                    class="text-lg leading-6 font-medium text-gray-900"-->
<!--                >-->
<!--                  Modifier le compte-->
<!--                </DialogTitle>-->
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
                        <div class="w-4/12 md:w-2/12 lg:w-24">
                          <VaAvatar
                              color="#f2f2f2"
                              class="mr-6 object-cover shadow-lg"
                              size="84px"
                              fallback-icon="warning"
                          >
                            <img
                                v-if="me?.avatar"
                                :src="me?.avatar"
                                alt="avatar"
                                class="w-20 h-20 rounded-full object-cover"
                            />
                          </VaAvatar>
                        </div>
                        <div class="">
                          <h1 class="text-[24px] font-semibold">
                            Modifier Mon compte
                          </h1>
                          <input id="fileInput"
                                 ref="fileRef"
                                 type="file"
                                 hidden accept=".png, .jpeg, .jpg, .gif"
                                 @input="getUploadedImage($event)"
                          />

                          <button class="bg-white border-2 hover:text-white hover:bg-blue-800 border border-blue-800 text-blue-800 rounded-md px-3 py-0.5 mt-2"
                                  @click="editAvatar"
                          >
                            Changer la photo
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-span-1">
                      <label>
                        Prénom
                      </label>
                      <VaInput v-model="me.lastName"
                               placeholder="Prénom"
                      />
                    </div>
                    <div class="col-span-1">
                      <label>
                        Nom
                      </label>
                      <VaInput v-model="me.firstName"
                               placeholder="Nom"
                      />
                    </div>
<!--                    <div class="col-span-1">-->
<!--                      <label>-->
<!--                        Téléphone-->
<!--                      </label>-->
<!--                      <VaInput v-model="me.phone"-->
<!--                               placeholder="Téléphone"-->
<!--                      />-->
<!--                    </div>-->
<!--                    <div class="col-span-1">-->
<!--                      <label>-->
<!--                        email-->
<!--                      </label>-->
<!--                      <VaInput v-model="me.email"-->
<!--                               placeholder="email"-->
<!--                      />-->
<!--                    </div>-->
                  </div>
                </div>
                <footer
                    class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                >
                  <button
                      type="submit"
                      :class="(me.lastName === compte.lastName && me.firstName === compte.firstName || me.lastName === '' || me.firstName === '')
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
import {axiosClient} from "~/utils/axios.js";
import swal from "~/plugins/sweetalert.js";

const props = defineProps({
  modelValue: Boolean,
});
const $swal = swal().provide.swal;
const { $authedUserStore, $usersStore } = useNuxtApp();
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

const compte = ref($authedUserStore?.userData);
watchEffect(() => {
  compte.value = $authedUserStore?.userData;
});
const me = reactive({
  lastName: compte.value?.lastName,
  firstName: compte.value?.firstName,
  phone: compte.value?.phone,
  email: compte.value?.email,
  adresse: compte.value?.adresse,
  // avatar: compte.value.avatar,
});

const fileRef = ref(null);
const file = ref(null);
const fileData = ref(null);
const fileDisplay = ref(null);
const isValidFile = ref(null);
const urlToPost = ref(null);

const editAvatar = () => {
  const fileInput = fileRef.value
  fileInput.click();
};

const getUploadedImage = async (e) => {
  if (e.target.files && e.target.files.length > 0) {
    file.value = e.target.files[0];
    fileData.value = file.value;
    const extension = fileData.value.name.substring(fileData.value.name.lastIndexOf(".") + 1);
    if (extension === "png" || extension === "jpg" || extension === "jpeg") {
      isValidFile.value = true;
    } else {
      isValidFile.value = false;
      return;
    }
    fileDisplay.value = URL.createObjectURL(file.value);
    me.avatar = fileDisplay.value;
  }
};

const onSubmit = async () => {
  loading.value = true;
  if (fileDisplay.value){
    if (!isValidFile.value) {
      $swal.fire({
        title: "Erreur",
        text: "Veuillez choisir une image valide",
        icon: "error",
      });
      loading.value = false;
      return;
    }

    try {
      //saved the file
      const formData = new FormData();
      formData.append("file", fileData.value);
      const res = await axiosClient.post("/upload/public", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      urlToPost.value = res.data.file_url;
      me.avatar = urlToPost.value;``
    } catch (e) {
      errors.value = e.response.data.errors;
      $swal.fire({
        title: "Erreur",
        text: "Une erreur s'est produite lors de l'envoi de l'image",
        icon: "error",
      });
    }
  }


  let user = {
    lastName: me.lastName,
    firstName: me.firstName,
  };

  try {
    const  res = await $usersStore.updateUser(user,me.uid);
    if (res.success) {
      $swal.fire({
        title: "Succès",
        text: "Compte modifié avec succès",
        icon: "success",
      });
      closeModal();
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
</script>

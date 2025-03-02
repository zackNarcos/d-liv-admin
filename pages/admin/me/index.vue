<template>
  <div>
    <AdminLayout>
      <Head>
        <Title>{{ title }}</Title>
        <Meta name="description" :content="title" />
      </Head>
      <div
        class="my-5 text-md md:text-lg lg:text-2xl font-semibold text-gray-500"
      >
        Mon profil
      </div>
      <!-- Detail -->
      <div
        class="relative mb-3 px-5 py-2 bg-white border shadow-sm sm:rounded-lg min-h-screen"
      >
        <div class="">
          <!-- header -->
          <div class="flex border-b border-gray-300 pb-4">
            <div class="w-4/12 md:w-2/12 lg:w-24">
              <VaAvatar
                  color="blue-800"
                  class="mr-6"
                  size="84px"
              >
                <span class="text-[24px] font-semibold">{{ user?.firstName.charAt(0) }}.{{ user?.lastName.charAt(0) }}.</span>
              </VaAvatar>
            </div>
            <div class="">
              <h1 class="text-[24px] font-semibold">
                {{ user?.firstName }} {{ user?.lastName }}
                <span class="text-[11px] font-normal rounded text-blue-800 bg-blue-800/15 py-0.5 px-2 ml-1">Actif</span>
              </h1>
              <button class="bg-white border-2 hover:text-white hover:bg-blue-800 border border-blue-800 text-blue-800 rounded-md px-3 py-0.5 mt-2"
                      @click="edit"
              >
                Modifier mon profil
              </button>
            </div>
          </div>
          <MeModal
              v-model="showModal"
              @close="onModalClose"
              @refresh="refreshDatas"
          />
          <!-- body -->
          <div class="flex mt-4">
            <div class="w-4/12">
              <div class="gap-6 grid grid-cols-1">
                <div class="col-span-1">
                  <label>
                    Nom:
                  </label>
                  <p class="text-gray-400">
                    {{ user?.firstName }}
                  </p>
                </div>
                <div class="col-span-1">
                  <label>
                    Prénom:
                  </label>
                  <p class="text-gray-400">
                    {{ user?.lastName }}
                  </p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="gap-6 grid grid-cols-1">
                <div class="col-span-1 flex">
                  <div class="">
                    <label>
                      Téléphone:
                      <button class="ms-2 bg-white border-2 hover:text-white hover:bg-blue-800 border border-blue-800 text-blue-800 rounded-md px-3 py-0"
                      >
                        Modifier
                      </button>
                    </label>
                    <p class="text-gray-400">
                      {{ user?.phone }}
                    </p>
                  </div>
                </div>
                <div class="col-span-1 flex">
                  <div class="">
                    <label>
                      E-mail:
                      <button class="ms-2 bg-white border-2 hover:text-white hover:bg-blue-800 border border-blue-800 text-blue-800 rounded-md px-3 py-0"
                      >
                        Modifier
                      </button>
                    </label>
                    <p class="text-gray-400">
                      {{ user?.email }}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import swal from "~/plugins/sweetalert.js";
import MeModal from "~/pages/admin/me/meModal.vue";
import {storeToRefs} from "pinia";

const $swal = swal().provide.swal;
const { $authedUserStore } = useNuxtApp();


const title = ref("D-liv | Details Profil");

const user = ref($authedUserStore?.userData);
watchEffect(() => {
  user.value = $authedUserStore?.userData;
});

const  showModal = ref(false);
const edit = async () => {
  try {
    showModal.value = true;
  } catch (error) {
    console.log(error);
  }
};
const onModalClose = () => {
  showModal.value = false;
};
const refreshDatas = async () => {
};
</script>
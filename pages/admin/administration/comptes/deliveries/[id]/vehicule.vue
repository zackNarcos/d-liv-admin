<template>
  <div>
    <DeliveryLayout>
      <div class="text-2xl font-bold text-blue-800 border-b border-gray-200 pb-2">
        Details
      </div>
      <div>
        Type de vehicule:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.vehicle?.data?.type || 'Non renseigné'
          }}
        </span>
      </div>
      <div>
        Marque du vehicule:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.vehicle?.data?.marque || 'Non renseigné'
          }}
        </span>
      </div>
      <div>
        Modele du vehicule:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.vehicle?.data?.model || 'Non renseigné'
          }}
        </span>
      </div>
      <div>
        Matricule du vehicule:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.vehicle?.data?.matricule || 'Non renseigné'
          }}
        </span>
      </div>
      <div class="flex gap-2 items-center">
        Couleur:
        <span class="h-4 w-10  inline-block rounded-lg" :style="{ backgroundColor: '#' + user?.registrationSteps?.vehicle?.data?.color || ''}"></span>
      </div>
      <div class="mb-1 mt-5 border-b border-gray-200 text-2xl font-bold text-blue-800">
        Images du vehicule :
      </div>
      <div>

      </div>
      <div class="flex mb-3 pt-2 justify-around" v-if="user?.registrationSteps?.vehicle?.files && user?.registrationSteps?.vehicle?.files.length > 0">
        <div class="pr-1 w-1/2 relative" v-if="user?.registrationSteps?.vehicle?.files[0]">
          <img ref="image" :src="user?.registrationSteps?.vehicle?.files[0]?.url" alt="Piece d'identité" class="w-full rounded-lg border border-gray-200">
          <div class="absolute top-3 right-4 flex gap-1  rounded-full p-1">
            <Icon name="bi:eye"
                  class="bg-blue-800 text-white rounded-full p-1 cursor-pointer hover:bg-blue-300 shadow-md"
                  size="30"
                  @click="openFullscreen()"
            />
            <Icon name="bi:link"
                  class="bg-blue-800 text-white rounded-full p-1 cursor-pointer hover:bg-blue-300 shadow-md"
                  size="30"
                  @click="copyToClipboard(user?.registrationSteps?.vehicle?.files[0].url)"
            />
          </div>
        </div>
        <div class="pl-1 w-1/2 relative" v-if="user?.registrationSteps?.vehicle?.files[1]">
          <img ref="image2" :src="user?.registrationSteps?.vehicle?.files[1].url" alt="Piece d'identité" class="w-full rounded-lg border border-gray-200">
          <div class="absolute top-3 right-4 flex gap-1  rounded-full p-1">
            <Icon name="bi:eye"
                  class="bg-blue-800 text-white rounded-full p-1 cursor-pointer hover:bg-blue-300 shadow-md"
                  size="30"
                  @click="openFullscreen2()"
            />
            <Icon name="bi:link"
                  class="bg-blue-800 text-white rounded-full p-1 cursor-pointer hover:bg-blue-300 shadow-md"
                  size="30"
                  @click="copyToClipboard(user?.registrationSteps?.vehicle?.files[0].url)"
            />
          </div>
        </div>
      </div>
      <div class="mb-2 mt-5 border-b border-gray-200 text-2xl font-bold text-blue-800">
        Ajouter un commentaire :
      </div>
      <QuillEditorWrapper
          v-model="comment"
          placeholder="Ajouter un commentaire"

      />
      <div class="pb-2 mt-6 flex gap-4 justify-between" v-if="user?.status === StatusEnum.UNDER_REVIEW">
        <button
            class="bg-red-500 text-white px-6 py-2 rounded-lg"
            @click="onReject"
        >
          Rejeter
        </button>

        <button
            class="bg-blue-800 text-white px-6 py-2 rounded-lg"
            @click="onSubmit"
        >
          Accepter
        </button>
      </div>
    </DeliveryLayout>
  </div>

</template>
<script setup>
import DeliveryLayout from './DeliveryLayout.vue';
import {StatusEnum, StepEnum} from "~/lib/status.enum";

const route = useRoute()
const title = ref('Details')

const id = route.params.id

const comment = ref('');

const { $usersStore } = useNuxtApp();
const user = ref($usersStore?.single.data);
const image = ref(null);
const image2 = ref(null);

watchEffect(() => {
  user.value = $usersStore?.single.data;
  comment.value = $usersStore?.single.data?.registrationSteps?.vehicle?.notes;
});

const openFullscreen = () => {

  if (image.value?.requestFullscreen) {
    image.value.requestFullscreen();
  } else if (image.value?.webkitRequestFullscreen) { // Pour Safari
    image.value.webkitRequestFullscreen();
  } else if (image.value?.mozRequestFullScreen) { // Pour Firefox
    image.value.mozRequestFullScreen();
  } else if (image.value?.msRequestFullscreen) { // Pour IE
    image.value.msRequestFullscreen();
  }
};

const openFullscreen2 = () => {
  if (image2.value?.requestFullscreen) {
    image2.value.requestFullscreen();
  } else if (image2.value?.webkitRequestFullscreen) { // Pour Safari
    image2.value.webkitRequestFullscreen();
  } else if (image2.value?.mozRequestFullScreen) { // Pour Firefox
    image2.value.mozRequestFullScreen();
  } else if (image2.value?.msRequestFullscreen) { // Pour IE
    image2.value.msRequestFullscreen();
  }
};

const copyToClipboard = (url) => {
  navigator.clipboard.writeText(url);
  alert('Lien copié dans le presse-papier');
};

const onSubmit = () => {
  onUpdateStatus(StatusEnum.VERIFIED);
};

const onReject = () => {
  onUpdateStatus(StatusEnum.REJECTED);
};

const onUpdateStatus = (status) => {
  const data = {
    status,
    comment: comment.value,
    type: StepEnum.VEHICLE,
  };

  $usersStore.updateStatus(data);
};

</script>
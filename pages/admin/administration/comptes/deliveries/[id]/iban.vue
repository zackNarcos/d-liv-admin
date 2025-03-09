<template>
  <div>
    <DeliveryLayout>
      <div class="text-2xl font-bold text-blue-800 border-b border-gray-200 pb-2">
        Information sur l'Iban
      </div>
      <div>
        Iban:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.iban?.data?.iban || 'Non renseigné'
          }}
        </span>
      </div>
      <div>
        Adresse:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.iban?.data?.address || 'Non renseigné'
          }}
        </span>
      </div>
      <div>
        Ville:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.iban?.data?.city || 'Non renseigné'
          }}
        </span>
      </div>
      <div>
        Code postal:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.iban?.data?.postalCode || 'Non renseigné'
          }}
        </span>
      </div>
      <div>
        Pays:
        <span class="text-lg font-bold text-gray-600 ml-2">
          {{
            user?.registrationSteps?.iban?.data?.country || 'Non renseigné'
          }}
        </span>
      </div>
      <div class="mb-2 mt-5 border-b border-gray-200 text-2xl font-bold text-blue-800">
        Ajouter un commentaire :
      </div>
      <QuillEditorWrapper
          v-model="comment"
          placeholder="Ajouter un commentaire"

      />
      <div class="pb-2 mt-6 flex gap-4 justify-between">
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
  comment.value = $usersStore?.single.data?.registrationSteps?.iban?.notes;
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
    type: StepEnum.IBAN,
  };

  $usersStore.updateStatus(data);
};

</script>
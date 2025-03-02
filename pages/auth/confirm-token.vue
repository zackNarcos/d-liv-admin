<template>
  <div
      class="mx-4 bg-blue-100 h-svh w-full md:mx-auto flex items-center gap-5 lg:justify-center flex-col lg:flex-row py-10"
  >
    <div class="w-full py-12 xl:py-24  rounded-md lg:w-2/5 bg-white">
      <div>
        <NuxtLink to="/" class="flex items-center justify-center md:mt-5 gap-3">
          <Logo
              :textColor="'text-gray-700'"
              :imgSize="'w-16  xl:w-20'"
              :textSize="'text-[15px]'"
          />
        </NuxtLink>
      </div>
      <div class="px-16">
        <h2 class="py-2 text-2xl mt-5 text-gray-800">Réinitialisation de mot de passe</h2>
        <p class="text-gray-700 text-sm">
          Un code de vérification a été envoyé à votre adresse e-mail. Veuillez entrer le code pour réinitialiser votre mot de passe.
        </p>
        <p v-if="errors" class="py-1 bg-red-100/50 text-red-400 rounded ps-4 border border-red-300">
          {{ errors }}
        </p>
        <div class="py-4 w-full mt-5">
          <CodeInput v-model="code" />
        </div>
        <div class="pb-2 mt-6">
          <va-button
              @click="login"
              :disabled="isButtonDisabled"
              size="large"
              block
          >
            Valider
          </va-button>
        </div>
        <p>
          <span class="text-gray-700 pe-3">Vous n'avez pas reçu le code ?</span>
          <span @click="sendNewToken()" class="text-primary hover:text-primary-dark">Renvoyer le code</span>
          <span v-if="timeBeforeResend > 0" class="text-gray-700"> dans {{ timeBeforeResend }}s</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from "~/components/core/Logo.vue";
import axios from "axios";
const { $authedUserStore } = useNuxtApp();
const router = useRouter();

definePageMeta({
  layout: false,
  title: "D-liv | Mot de passe oublié",
});

let code = ref("");
let errors = ref(null);
let timeBeforeResend = ref(0);

const isButtonDisabled = computed(() => {
  return code.value.length < 4;
});
const login = async () => {
  const res = await $authedUserStore.verifyResetToken(code.value);
  if (res.response?.status === 401 || res.response?.status === 404) {
    errors.value = "Code invalide ou expiré";
  }

  if (res.response?.status === 500) {
    errors.value = "Erreur interne du serveur";
  }

  if (res.status === 200 || res.status === 201) {
    errors.value = null;
    await router.push("/auth/reset-password");
  }

};

const sendNewToken = async () => {
  if (timeBeforeResend.value > 0) return;

  const email = localStorage.getItem("reset_email");
  const res = await $authedUserStore.forgotPassword(email);
  if (res.response?.status === 404) {
    errors.value = "Email non trouvé";
    await router.push("/auth/forgot-password");
  }

  if (res.response?.status === 500) {
    errors.value = "Erreur interne du serveur";
  }

  if (res.status === 200 || res.status === 201) {
    errors.value = null;
    timeBeforeResend.value = 60;
    const interval = setInterval(() => {
      timeBeforeResend.value--;
      if (timeBeforeResend.value === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
};

watchEffect(() => {
  if ($authedUserStore.error) {
    errors.value = $authedUserStore.error;
  }
});

onMounted(() => {
  if ($authedUserStore.isAuthenticated) {
    router.push("/");
  }
});

</script>
<style>
</style>
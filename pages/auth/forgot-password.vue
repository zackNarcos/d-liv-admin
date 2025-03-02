<template>
  <div
      class="mx-4 bg-blue-100 h-svh w-full md:mx-auto flex items-center gap-5 lg:justify-center flex-col lg:flex-row py-10"
  >
    <div class="w-full py-12 xl:py-24 rounded-md lg:w-2/5 bg-white">
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
        <h2 class="py-2 text-2xl mt-5 text-gray-800">Mot de passe oublié</h2>
        <p class="text-gray-700 text-sm">
          Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.
        </p>
        <p v-if="errors" class="py-1 bg-red-100/50 text-red-400 rounded ps-4 border border-red-300">
          {{ errors }}
        </p>
        <div class="py-4 w-full">
          <va-input
              clearable
              type="email"
              v-model="email"
              placeholder="exemple@domaine.com"
              label="Email"
              class="capitalize"
              :rules="[v => !!v || 'Email est requis', v => /.+@.+\..+/.test(v) || 'Email invalide']"
          />
        </div>
        <div class="text-sm text-gray-600 text-right">
          <div class="cursor-pointer underline">
            <NuxtLink
                to="/auth/login"
                class="text-primary hover:text-primary-dark"
            >Connexion</NuxtLink
            >
          </div>
        </div>
        <div class="pb-2 mt-6">
          <va-button
              @click="login"
              :disabled="isButtonDisabled"
              size="large"
              block
          >
            Continuer
          </va-button>
        </div>
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

let email = ref("zackabess@gmail.com");
let errors = ref(null);


const isButtonDisabled = computed(() => {
  return !email.value || !/.+@.+\..+/.test(email.value);
});
const login = async () => {
  const res = await $authedUserStore.forgotPassword(email.value);
  if (res.response?.status === 404) {
    errors.value = "Email non trouvé";
  }

  if (res.response?.status === 500) {
    errors.value = "Erreur interne du serveur";
  }

  if (res.status === 201) {
    errors.value = null;
    await router.push("/auth/confirm-token");
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
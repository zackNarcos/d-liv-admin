<script setup>
import "material-design-icons-iconfont/dist/material-design-icons.min.css";
import "tippy.js/dist/tippy.css";
import { useAuthedUser } from "~/stores/authedUser";

const authedUser = useAuthedUser();
const router = useRouter();

watchEffect(async () => {
  await authedUser.init();
  if (!authedUser.isAuthenticated) {
    // const allowList = [
    //   "/auth/login",
    //   "/auth/register",
    //   "/auth/forgot-password",
    //   "/auth/confirm-token",
    //   "/auth/reset-password",
    // ];
    // if (!allowList.includes(router.currentRoute.value.path))
    await router.push("/auth/login");
  }
});
//init authedUser
onMounted(async () => {
  await authedUser.init();
});
</script>

<template>
  <NuxtLayout v-show="authedUser.isAuthenticated">  
    <NuxtPage />
  </NuxtLayout>
</template>
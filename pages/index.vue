<template>
  <AdminLayout>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
    </Head>
    <div class="my-5 text-md md:text-lg lg:text-2xl font-semibold text-gray-600">Tableau de bord</div>
    <!-- Stats !-->
<!--    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">-->
<!--      <Stats bg-icon="bg-blue-100" IconColor="text-blue-600" title="Plans de passations" :TextBox="35" />-->
<!--      <Stats bg-icon="bg-red-100" IconColor="text-red-600" title="Appels d'offres" :TextBox="105" />-->
<!--      <Stats bg-icon="bg-orange-100" IconColor="text-orange-600" title="Fournisseurs" :TextBox="105" />-->
<!--      <Stats bg-icon="bg-purple-100" IconColor="text-purple-600" title="Autorités contractantes" :TextBox="65" />-->
<!--    </div>-->
  </AdminLayout>
</template>
<script setup>
  import AdminLayout from "~/layouts/AdminLayout.vue";
  import Stats from "~/components/dashboard/Stats.vue";
  import { useAuthedUser } from "~/stores/authedUser";

  const authedUser = useAuthedUser();
  const router = useRouter();
  const title = ref("D-liv | Dashboard");


  onMounted(async () => {
    if (!authedUser.isAuthenticated) {
      const allowList = [
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
        "/auth/confirm-token",
        "/auth/reset-password",
      ];
      if (!allowList.includes(router.currentRoute.value.path))
        await router.push("/auth/login");
    }
  });
</script>

<template>
  <AdminLayout>
    <Head>
      <Title>{{ title }}</Title>
      <Meta name="description" :content="title" />
    </Head>
    <div class="my-5 text-md md:text-lg lg:text-2xl font-semibold text-gray-600">Tableau de bord</div>
    <div class="mx-3">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        <StatCard
            title="Gains hebdomadaires"
            :value="dashboard.globalStats?.weeklyRevenue + ' €'"
            :change="dashboard.globalStats?.weeklyRevenueChange"
            icon="💳"
            description="Par rapport au mois dernier"
        />
        <StatCard
            title="Nouveaux utilisateurs"
            :value="dashboard.globalStats?.newUsers"
            :change="dashboard.globalStats?.newUsersChange"
            icon="👥"
            description="Inscrits cette semaine"
        />
        <StatCard
            title="Nouveaux livreurs"
            :value="dashboard.globalStats?.newDrivers"
            :change="dashboard.globalStats?.newDriversChange"
            icon="🚚"
            description="Inscrits cette semaine"
        />
        <StatCard
            title="Nouvelles livraisons"
            :value="dashboard.globalStats?.newDeliveries"
            :change="dashboard.globalStats?.newDeliveriesChange"
            icon="📦"
            description="Créées cette semaine"
        />
      </div>


      <div class="grid gap-6 lg:grid-cols-7 mb-7">
        <div class="lg:col-span-4">
          <!-- Revenue Chart Placeholder -->
          <div class="bg-white rounded-lg p-6 border border-border border-gray-50 shadow-sm h-full flex flex-col">
            <h3 class="text-xl font-semibold mb-4">Livraisons récentes</h3>
            <div class="flex-grow flex items-center justify-center text-muted-foreground">
              <RecentDeliveries />
            </div>
          </div>
        </div>
        <div class="lg:col-span-3">
          <!-- User Growth Chart Placeholder -->
          <div class="bg-white rounded-lg p-6 border border-border border-gray-50 shadow-sm h-full">
            <h3 class="text-xl font-semibold mb-4">Croissance des utilisateurs</h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <span class="text-emerald-500 text-lg">✅</span>
                </div>
                <div>
                  <p class="text-sm font-medium">Livraisons terminées</p>
                  <p class="text-xs text-muted-foreground">Aujourd'hui</p>
                </div>
              </div>
              <p class="text-2xl font-bold">{{ dashboard.activityStats?.deliveredToday }}</p>
            </div>

            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-3">
                <div class="p-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <span class="text-amber-500 text-lg">🚚</span>
                </div>
                <div>
                  <p class="text-sm font-medium">En cours</p>
                  <p class="text-xs text-muted-foreground">À livrer</p>
                </div>
              </div>
              <p class="text-2xl font-bold">{{ dashboard.activityStats?.inProgress }}</p>
            </div>

            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-3">
                <div class="p-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <span class="text-blue-500 text-lg">📈</span>
                </div>
                <div>
                  <p class="text-sm font-medium">Taux de complétion</p>
                  <p class="text-xs text-muted-foreground">Aujourd'hui</p>
                </div>
              </div>
              <p class="text-2xl font-bold">{{ dashboard.activityStats?.completionRate }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
  import AdminLayout from "~/layouts/AdminLayout.vue";
  import RecentDeliveries from "~/components/dashboard/RecentDeliveries.vue";

  const title = ref("D-liv | Dashboard");
  const dashboard = useDashboardStore();

  onMounted(async () => {
    await dashboard.fetchDashboardData();
  });
</script>

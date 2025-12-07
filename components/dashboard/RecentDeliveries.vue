<script setup lang="ts">
import { useDashboardStore } from "~/stores/dashboard";

const dashboard = useDashboardStore();

const getStatusBadge = (status: string) => {
  const badges = {
    'delivered': { label: 'Livrée', class: 'bg-green-500/10 text-green-500 border-green-500/20' },
    'in-progress': { label: 'En cours', class: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    'pending': { label: 'En attente', class: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    'cancelled': { label: 'Annulée', class: 'bg-red-500/10 text-red-500 border-red-500/20' }
  }
  return badges[status as keyof typeof badges] || badges.pending
}
</script>

<template>

  <div class="space-y-4 w-full ">

    <div v-if="dashboard.isLoading">Chargement…</div>

    <div v-else-if="dashboard.recentDeliveries.length === 0" class="text-sm text-muted-foreground">
      Aucune livraison récente.
    </div>
    <div
        v-else
        v-for="delivery in dashboard.recentDeliveries"
        :key="delivery._id"
        class="flex items-center justify-between py-3 border-b border-border last:border-0 w-full"
    >
      <div class="flex-1">
        <p class="font-medium text-sm text-muted-foreground">{{ delivery.code }}</p>
        <p class="text-sm mt-1">
          <span class="text-foreground">{{ delivery.senderName }}</span>
          <span class="text-muted-foreground mx-2">→</span>
          <span class="text-foreground">{{ delivery.receiverName }}</span>
        </p>
      </div>
      <div class="flex items-center gap-4">
          <span
              :class="['px-3 py-1 rounded-full text-xs font-medium border', getStatusBadge(delivery.status).class]"
          >
            {{ getStatusBadge(delivery.status).label }}
          </span>
        <span class="text-foreground font-semibold min-w-[60px] text-right">
            {{ delivery.price > 0 ? `${delivery.price.toFixed(2)} €` : '-' }}
          </span>
      </div>
    </div>
  </div>

</template>
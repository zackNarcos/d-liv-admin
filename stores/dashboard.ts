import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        globalStats: null,
        activityStats: null,
        recentDeliveries: [],
        isLoading: false,
        error: null,
    }),

    actions: {
        async fetchDashboardData() {
            try {
                this.isLoading = true;
                this.error = null;

                // Appels parallèles pour vitesse maximale
                const [globalRes, activityRes, recentRes] = await Promise.all([
                    axiosClient3.get("/dashboard/global-stats"),
                    axiosClient3.get("/dashboard/activity-stats"),
                    axiosClient3.get("/dashboard/recent-deliveries"),
                ]);

                this.globalStats = globalRes.data;
                this.activityStats = activityRes.data;
                this.recentDeliveries = recentRes.data?.items;

            } catch (error: any) {
                console.error("Dashboard fetch failed:", error);
                this.error = error?.response?.data?.message || "Erreur inconnue";
            } finally {
                this.isLoading = false;
            }
        },
    },
});

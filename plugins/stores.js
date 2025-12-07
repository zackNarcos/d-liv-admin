import {useAuthedUser} from "~/stores/authedUser.js";
import {useUsersStore} from "~/stores/account.js";
import {useCategoriesStore} from "~/stores/categories.js";

export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: {
            authedUserStore: useAuthedUser(),
            usersStore: useUsersStore(),
            assurancesStore: useAssurancesStore(),
            categoriesStore: useCategoriesStore(),
            deliveriesStore: useDeliveriesStore(),
            dashboardStore: useDashboardStore(),
        },
    };
});

import {useAuthedUser} from "~/stores/authedUser.js";
import {useUsersStore} from "~/stores/account.js";

export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: {
            authedUserStore: useAuthedUser(),
            usersStore: useUsersStore()
        },
    };
});

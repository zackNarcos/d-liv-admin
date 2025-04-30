export const sideMenuItems = reactive([
    {
        title: "Tableau de bord",
        icon: "iconoir:home",
        to: "/",
        items: [],
    },
    {
        title: "Administration",
        icon: "iconoir:user-circle",
        items: [
            { title: "Comptes employées", to: "/admin/administration/comptes/admins" },
            { title: "Comptes clients", to: "/admin/administration/comptes/clients" },
            { title: "Comptes livreurs", to: "/admin/administration/comptes/deliveries" },
        ],
    },
    {
        title: "Livraisons",
        icon: "iconoir:package",
        items: [
            { title: "Gestion des livraisons", to: "/admin/livraisons/courses" },
            { title: "Gestion des itinéraires", to: "/admin/livraisons/itineraires" },
        ],
    },
    {
        title: "Référentiel",
        icon: "teenyicons:adjust-vertical-outline",
        items: [
            {
                title: "Gestion des assurances",
                to: "/admin/referentiel/courses",
            },
            {
                title: "Gestion des catégories",
                to: "/admin/referentiel/categories"
            },
        ],
    },
]);
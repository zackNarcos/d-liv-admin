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
        title: "Référentiel",
        icon: "teenyicons:adjust-vertical-outline",
        items: [
            {
                title: "Gestion des assurances",
                to: "/admin/referentiel/assurance",
            },
            {
                title: "Gestion des catégories",
                to: "/admin/referentiel/categories"
            },
            // {
            //     title: "Pays",
            //     to: "/admin/referentiel/pays",
            // },
        ],
    },
    // {
    //     title: "Gestion du contenu",
    //     icon: "bi:newspaper",
    //     items: [
    //         // { title: "Formulaires et modèles", to: "/admin/annexes/formulaires-et-modeles" },
    //         // { title: "Gestion des actualités", to: "/admin/annexes/posts" },
    //         // { title: "Gestion de la faq", to: "/admin/annexes/faq" },
    //         // { title: "Gestion de la newsletter", to: "/admin/annexes/newsletter" },
    //     ],
    // },
]);
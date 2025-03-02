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
                title: "Critères d'élégibilité",
                to: "/admin/referentiel/criteres-de-qualification",
            },
            {
                title: "Pays",
                to: "/admin/referentiel/pays",
            },
            {
                title: "Modèles de fichier",
                to: "/admin/referentiel/modeles-de-fichier",
            },
        ],
    },
    {
        title: "Gestion du contenu",
        icon: "bi:newspaper",
        items: [
            { title: "Formulaires et modèles", to: "/admin/annexes/formulaires-et-modeles" },
            { title: "Gestion des actualités", to: "/admin/annexes/posts" },
            { title: "Gestion de la faq", to: "/admin/annexes/faq" },
            { title: "Gestion de la newsletter", to: "/admin/annexes/newsletter" },
        ],
    },
]);
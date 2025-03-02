export default defineNuxtConfig({
  devtools: { enabled: true },
  // app: {
  //   head: {
  //     script: [{ src: "/js/smartsupp.js" }],
  //   },
  // },
  routes: {
    '/': { prerender: true },
    '/*': { cors: true },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pages: true,
  modules: [
    "@pinia/nuxt",
    "nuxt-icon",
    "@pinia-plugin-persistedstate/nuxt",
    "@vuestic/nuxt",
    "@vueuse/nuxt",
  ],
  vuestic: {
    config: {
      colors: {
        variables: {
          // Default colors
          primary: "#233d93",
          secondary: "#babfc2",
          success: "#40e583",
          info: "#2c82e0",
          danger: "#e34b4a",
          warning: "#ffc200",
          gray: "#babfc2",
          dark: "#34495e",
        },
      },
      components: {
        VaInput: {
          // @ts-ignore
          class: "w-full",
        },
        VaSelect: {
          // @ts-ignore
          class: "w-full",
        },
      },
      i18n: {
        ok: "OK",
        cancel: "Annuler",
        search: "Rechercher",
        next: "Suivant",
        back: "Précédent",
        loading: "Chargement",
        finish: "Enregistrer",
        removeFile: "Supprimer fichier",
      },
    },
  },
  ssr: false,
  target: "server",
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  plugins: ["~/plugins/draggable.js", "~/plugins/vue-tippy.js"],
})

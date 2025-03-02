/** @type {Partial<CustomThemeConfig & {extend: Partial<CustomThemeConfig>}> & DefaultTheme} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
    content: ["./components/**/*.{js,vue,ts}", "./layouts/**/*.vue", "./pages/**/*.vue", "./plugins/**/*.{js,ts}", "./app.vue"],
    theme: {
      extend: {
          fontFamily: {
              sans: [...defaultTheme.fontFamily.sans],
          },
          keyframes: {
              "fade-in-down": {
                  from: {
                      transform: "translateY(-0.75rem)",
                      opacity: "0",
                  },
                  to: {
                      transform: "translateY(0rem)",
                      opacity: "1",
                  },
              },
          },
          animation: {
              "fade-in-down": "fade-in-down 0.2s ease-in-out both",
          },
          colors: {
              primary: {
                  light: "#3050bb",
                  DEFAULT: "#253E92",
                  dark: "#1e3274",
              },
              secondary: {
                  light: "#6b7280",
                  DEFAULT: "#3f3f46",
                  dark: "#27272a",
              },
          },
      },
  },
    plugins: ["tailwindcss-animate", "@tailwindcss/forms"],
}


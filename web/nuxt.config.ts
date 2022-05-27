import { defineNuxtConfig } from "nuxt";

const isProd = process.env.NODE_ENV === "production";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtclub/feathericons"],
  runtimeConfig: {
    beApiUrl: isProd ? process.env.PROD_BE_API_URL : process.env.BE_API_URL,
  },
});

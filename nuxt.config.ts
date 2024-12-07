// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    'dayjs-nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss'
  ],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  }
})
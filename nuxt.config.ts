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
  },
  app: {
    head: {
      title: 'Jadwal Sholat',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'language', content: 'id' },
        { hid: 'description', name: 'description', content: 'Jadwal Sholat untuk Mesjid.' },
        { property: 'og:title', content: 'Jadwal Sholat' },
        { property: 'og:description', content: 'Jadwal Sholat untuk Mesjid.' },
        { property: 'og:image', content: '/jslogo-min.png' },
        { property: 'og:url', content: 'https://nuxt-jadwal-sholat.vercel.app/' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Jadwal Sholat' },
        { name: 'twitter:description', content: 'Jadwal Sholat untuk Mesjid.' },
        { name: 'twitter:image', content: '/jslogo-min.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/jslogo.ico' }
      ]
    }
  }
})
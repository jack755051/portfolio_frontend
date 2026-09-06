import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxtjs/color-mode'],
  devServer: {
    port: 3030,
  },
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components/ui',
      extensions: ['vue'],
      pathPrefix: false
    },
    '~/components'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'portfolio-color-mode',
  },
  i18n: {
    locales: [
      { code: 'zh-TW', language: 'zh-TW', name: '繁體中文', file: 'zh-TW.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    defaultLocale: 'zh-TW',
    strategy: 'prefix_except_default',
    lazy: true,
    detectBrowserLanguage: false,
  },
  vite: {
    plugins: [tailwindcss()]
  }
})

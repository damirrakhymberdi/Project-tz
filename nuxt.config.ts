// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    compatibilityDate: '2025-10-05',
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss'
    ],
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            apiBase: '/api'
        }
    },
    nitro: {
        experimental: {
            wasm: true
        }
    }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    compatibilityDate: '2025-10-05',
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss'
    ],
    css: ['~/assets/css/main.css'],
    
    // GitHub Pages конфигурация
    app: {
        baseURL: '/Project-tz/',
        buildAssetsDir: '/_nuxt/'
    },
    
    // Статическая генерация для GitHub Pages
    nitro: {
        prerender: {
            routes: ['/']
        }
    },
    
    runtimeConfig: {
        public: {
            apiBase: '/api'
        }
    }
})

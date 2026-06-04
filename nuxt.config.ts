// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/supabase',
    '@nuxtjs/seo'
  ],
  css: ['~/assets/css/main.css'],
  supabase: {
      types: '~/types/database.types',
      redirectOptions: {
        login: '/auth/login',
        callback: '/auth/confirm',
        include: undefined,
        exclude: [
          '/',
          '/auth/register',
          '/post-details/*'
        ],
        saveRedirectToCookie: true,
  }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },
  site:{
    name: 'MVP Nuxt + Supabase',
    description: 'Blog feito na aula do MVP Nuxt + Supabase',

  },
  image: {
    domains :['https://elqphwuvugojxunsrdoh.supabase.co'],
  }
})
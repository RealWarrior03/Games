// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-07',

  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  css: ['vue-virtual-scroller/dist/vue-virtual-scroller.css'],

  colorMode: {
    preference: 'dark',
  },

  runtimeConfig: {
    origin: 'http://localhost:3000',
    public: {
      name: 'Henrys Games',
      description:
        'Hier findest du alle Spiele die Henry noch spielen will.',
      favicon: '/papaplatte.ico',
      showThanks: 'true',
    },
    oauth: {
      twitch: {
        clientId: process.env.NUXT_OAUTH_TWITCH_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_TWITCH_CLIENT_SECRET,
      },
    },
    igdb: {
      apiBase: 'https://api.igdb.com/v4',
    },
    twitch: {
      mails: process.env.NUXT_TWITCH_MAILS,
      userId: 115008476,
    },
    db: {
      path: 'games.db',
    },
    pubsub: {
      secret: 'local-secret',
    },
  },

  nitro: {
    experimental: {
      tasks: true,
    },
    imports: {
      dirs: ['server/utils'],
      presets: [
        {
          from: 'h3-zod',
          imports: [
            'useValidatedQuery',
            'useValidatedBody',
            'useValidatedParams',
          ],
        },
        {
          from: 'consola',
          imports: ['consola'],
        },
      ],
    },
  },
});

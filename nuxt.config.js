export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Формы для пряников, Декор',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/template/favicon.png' },
      { rel: 'preconnect', href: "https://fonts.gstatic.com" },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" },

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/vuesax.css',
    'boxicons/css/boxicons.min.css',
    '@/assets/css/template.css',    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Все настройки хранятся в .env файле
    baseURL: process.env.BASE_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  serverMiddleware: [
    '~/api/index.js',
  ],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          // required: true,
          type: ''
        },
        user: {
          property: 'username',
          autoFetch: true,
        },
        endpoints: {
          login: { url: process.env.BASE_URL + '/auth/login', method: 'post' },
          logout: { url: process.env.BASE_URL + '/auth/logout', method: 'post' },
          user: { url: process.env.BASE_URL + '/auth/user', method: 'get' }
        }
      }
    }
  }

}

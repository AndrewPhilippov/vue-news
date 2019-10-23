const pkg = require("./package");
const bodyParser = require("body-parser");
const axios = require("axios");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: "WD Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "My cool Web Development Blog"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff", height: "4px", duration: 2000 },
  loadingIndicator: {
    name: "circle",
    color: "#fa923f"
  },

  /*
  ** Global CSS
  */
  css: ["~assets/styles/main.css"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"],

  /*
  ** Nuxt.js modules
  */
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL: process.env.BASE_URL || "http://admin.lova.news/news/12",
    credentials: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {}
  },
  env: {
    baseUrl: process.env.BASE_URL || "http://admin.lova.news/",
    fbAPIKey: "AIzaSyCQCdp9jUi4MPrJfK6Zw-DLFFNioeszbdY"
  },
  transition: {
    name: "fade",
    mode: "out-in"
  },
  router: {
    linkActiveClass: 'nuxt-active-link',
    linkExactActiveClass: 'nuxt-exact-active-link',
    // middleware: 'log'
  },
  serverMiddleware: [bodyParser.json(), "~/api"],
  generate: {
    routes: function() {
      return axios
        .get("http://admin.lova.news/200")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push({
              route: `/news/${key.category.name}/${key.slug}/${key.id}`,
              payload: {postData: res.data[key]}
            });
          }
          return routes;
        });
    }
  }
};

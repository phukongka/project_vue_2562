// ของใหม่ export default{ }
module.exports = {
  mode: "spa",
  render: {
    resourceHints: false
  },
  router: {
    mode: "hash"
  },

  build: {
    vendor: [
      "vuetify", // ชื่อ packag
      "axios"
    ]
  },
  plugins: ["~/plugins/vuetify.js", "~/plugins/axios.js"],
  head: {
    title: "EEC-DEMO",
    meta: [
      { charset: "utf8" },
      { "http-equiv": "X-UA-Compatible", content: "IE-edge" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [
      // { rel: "shortcut icon", href: "icons/favicon.png" },
      // { rel: "icon",type: "image/png",sizes: "32x32",href: "/icons/favicon.png" },
      // { rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon.png" },
      { rel: 'shortcut icon', href: './icon/veh.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: './icon/veh.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: './icon/veh.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'iconfont/material-icons.css' },
      //{ rel: "apple-touch-icon", href: "/icons/favicon.png" },
      { rel: 'stylesheet', type: 'text/css', href: 'css/fontawesome-free/css/all.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'css/cv_style.css?v=1002' },
      /// { rel: 'stylesheet', type: 'text/css', href: '/css/fontawesome-all.min.css'},
      {rel: "stylesheet",type: "text/css", href:"https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" },
      { rel: 'mask-icon', href: './icon/veh.png', color: '#5bbad5' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' },
     ]
  }
};

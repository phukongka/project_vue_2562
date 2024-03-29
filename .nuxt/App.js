import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import _008ea4d2 from '..\\layouts\\backup\\default_old.vue'
import _4b1be72c from '..\\layouts\\backup\\default.vue'
import _19c8d9c0 from '..\\layouts\\backup\\public.vue'
import _6c4d425c from '..\\layouts\\backup\\tem_signin.vue'
import _6f6c098b from '..\\layouts\\default.vue'
import _7e152806 from '..\\layouts\\default1.vue'
import _100afa94 from '..\\layouts\\New folder\\default.vue'
import _0755d43b from '..\\layouts\\New folder\\default1.vue'
import _6a75b958 from '..\\layouts\\New folder\\public.vue'
import _378b9890 from '..\\layouts\\New folder\\tem_signin.vue'
import _f7662442 from '..\\layouts\\public.vue'
import _0875b4ca from '..\\layouts\\tem_signin.vue'

const layouts = { "_backup/default_old": _008ea4d2,"_backup/default": _4b1be72c,"_backup/public": _19c8d9c0,"_backup/tem_signin": _6c4d425c,"_default": _6f6c098b,"_default1": _7e152806,"_New folder/default": _100afa94,"_New folder/default1": _0755d43b,"_New folder/public": _6a75b958,"_New folder/tem_signin": _378b9890,"_public": _f7662442,"_tem_signin": _0875b4ca }

export default {
  head: {"title":"EEC-DEMO","meta":[{"charset":"utf8"},{"http-equiv":"X-UA-Compatible","content":"IE-edge"},{"name":"viewport","content":"width=device-width, initial-scale=1"}],"link":[{"rel":"shortcut icon","href":".\u002Ficon\u002Fveh.png"},{"rel":"apple-touch-icon","sizes":"180x180","href":".\u002Ficon\u002Fveh.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":".\u002Ficon\u002Fveh.png"},{"rel":"stylesheet","type":"text\u002Fcss","href":"iconfont\u002Fmaterial-icons.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"css\u002Ffontawesome-free\u002Fcss\u002Fall.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"css\u002Fcv_style.css?v=1002"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900|Material+Icons"},{"rel":"mask-icon","href":".\u002Ficon\u002Fveh.png","color":"#5bbad5"},{"name":"msapplication-TileColor","content":"#da532c"},{"name":"theme-color","content":"#ffffff"}],"style":[],"script":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if(layout && typeof layout !== 'string') throw new Error('[nuxt] Avoid using non-string value as layout property.')

      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}

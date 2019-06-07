import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _5c3d8a1e = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _d425ab44 = () => interopDefault(import('..\\pages\\home.vue' /* webpackChunkName: "pages_home" */))
const _459d07fa = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _00011f3c = () => interopDefault(import('..\\pages\\login_old.vue' /* webpackChunkName: "pages_login_old" */))
const _899752bc = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages_register" */))
const _b470e43e = () => interopDefault(import('..\\pages\\signin.vue' /* webpackChunkName: "pages_signin" */))
const _2447d776 = () => interopDefault(import('..\\pages\\student\\index.vue' /* webpackChunkName: "pages_student_index" */))
const _f7b82a22 = () => interopDefault(import('..\\pages\\student-list.vue' /* webpackChunkName: "pages_student-list" */))
const _5f08088a = () => interopDefault(import('..\\pages\\admin\\teacher_list.vue' /* webpackChunkName: "pages_admin_teacher_list" */))
const _f196d340 = () => interopDefault(import('..\\pages\\reports\\report_condition.vue' /* webpackChunkName: "pages_reports_report_condition" */))
const _2eea807b = () => interopDefault(import('..\\pages\\reports\\report_everda1.vue' /* webpackChunkName: "pages_reports_report_everda1" */))
const _32e11cc3 = () => interopDefault(import('..\\pages\\reports\\report_everday.vue' /* webpackChunkName: "pages_reports_report_everday" */))
const _294c0d7e = () => interopDefault(import('..\\pages\\reports\\report_everday1.vue' /* webpackChunkName: "pages_reports_report_everday1" */))
const _6f8d1feb = () => interopDefault(import('..\\pages\\reports\\report_one.vue' /* webpackChunkName: "pages_reports_report_one" */))
const _6308538e = () => interopDefault(import('..\\pages\\req\\human.vue' /* webpackChunkName: "pages_req_human" */))
const _64bca92b = () => interopDefault(import('..\\pages\\student\\index1.vue' /* webpackChunkName: "pages_student_index1" */))
const _7bf564e3 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'hash',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about",
      component: _5c3d8a1e,
      name: "about"
    }, {
      path: "/home",
      component: _d425ab44,
      name: "home"
    }, {
      path: "/login",
      component: _459d07fa,
      name: "login"
    }, {
      path: "/login_old",
      component: _00011f3c,
      name: "login_old"
    }, {
      path: "/register",
      component: _899752bc,
      name: "register"
    }, {
      path: "/signin",
      component: _b470e43e,
      name: "signin"
    }, {
      path: "/student",
      component: _2447d776,
      name: "student"
    }, {
      path: "/student-list",
      component: _f7b82a22,
      name: "student-list"
    }, {
      path: "/admin/teacher_list",
      component: _5f08088a,
      name: "admin-teacher_list"
    }, {
      path: "/reports/report_condition",
      component: _f196d340,
      name: "reports-report_condition"
    }, {
      path: "/reports/report_everda1",
      component: _2eea807b,
      name: "reports-report_everda1"
    }, {
      path: "/reports/report_everday",
      component: _32e11cc3,
      name: "reports-report_everday"
    }, {
      path: "/reports/report_everday1",
      component: _294c0d7e,
      name: "reports-report_everday1"
    }, {
      path: "/reports/report_one",
      component: _6f8d1feb,
      name: "reports-report_one"
    }, {
      path: "/req/human",
      component: _6308538e,
      name: "req-human"
    }, {
      path: "/student/index1",
      component: _64bca92b,
      name: "student-index1"
    }, {
      path: "/",
      component: _7bf564e3,
      name: "index"
    }],

    fallback: false
  })
}

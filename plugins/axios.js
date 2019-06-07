// import Vue from 'vue'
// import axios from 'axios'
//import jquery from 'jquery'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const request = axios.create({
    baseURL : '/api',
    //baseURL: 'http://localhost:9000/api'
})

Vue.use(VueAxios, request)
// Vue.http = axios
// Vue.prototype.$http = axios // object ที่เกิดจาก class นี้ จะมี $http ทุกตัว บันนี้ทำให้ this มี this.$http  ใช้งาน
//Vue.prototype.$j = jquery
//this.$http



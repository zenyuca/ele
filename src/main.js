// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { localStorage, NOLOGIN_STATUS } from './config'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'
import VueLocalStorage from 'vue-localstorage'
import VueScroller from 'vue-scroller'
import CommonJS from '@/assets/js/common'

import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.css'
import '@/assets/stylus/reset.css'
import '@/assets/stylus/base.styl'

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(VueLocalStorage)
Vue.use(VueScroller)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  localStorage,
  template: '<App/>',
  components: { App },
  created () {
    // 登录拦截 （刷新页面时）
    CommonJS.storeAccount(this)
    const isLogin = CommonJS.isLogin(this)
    if (isLogin) {
      if (this.toUser()) {
        this.$router.replace('/account')
      }
    } else {
      if (!this.toUser()) {
        this.$router.replace('/user/login')
      }
    }
  },
  methods: {
    toUser () {
      let path = this.$route.path
      if (path.length > 1) {
        path = path.slice(0, path.lastIndexOf('/'))
      }
      return path === '/user'
    }
  }
})

// 登录拦截，（路由跳转时）
router.beforeEach((to, from, next) => {
  const isLogin = CommonJS.isLogin(vm)
  if (isLogin) {
    if (toUser(to)) {
      next('/account')
      return
    }
  } else {
    if (!toUser(to)) {
      next('/user/login')
      return
    }
  }
  next()
})

function toUser (to) {
  let path = to.matched[0].path
  return path === '/user'
}

// 请求拦截器
Vue.http.interceptors.push((request, next) => {
  if (!request.body.phone) {
    const account = CommonJS.getAccount(vm)
    request.body.phone = account.phone
  }
  if (!request.body.login_token) {
    const token = CommonJS.getToken(vm)
    request.body.login_token = token
  }
  MintUI.Indicator.open()
  next((response) => {
    MintUI.Indicator.close()
    const status = response.body.status
    if (status === NOLOGIN_STATUS) {
      CommonJS.removeToken(vm)
      MintUI.Toast({
        message: '账号在其它设备上登录',
        position: 'bottom',
        duration: 3000
      })
      vm.$router.replace('/user/login')
    } else {
      if (response.body.msg) {
        MintUI.Toast({
          message: response.body.msg,
          position: 'bottom',
          duration: 1500
        })
      }
    }
  })
})

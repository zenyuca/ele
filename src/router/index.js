import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/register/Login'
import Register from '@/components/register/Register'
import Losepwd from '@/components/register/Losepwd'
import Setpwd from '@/components/register/Setpwd'

import Me from '@/components/me/Me'
import Settings from '@/components/settings/Settings'
import SetNewpwd from '@/components/settings/SetNewpwd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/losepwd',
      name: 'Losepwd',
      component: Losepwd
    },
    {
      path: '/setpwd',
      name: 'Setpwd',
      component: Setpwd
    },
    {
      path: '/me',
      name: 'Me',
      component: Me
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/setNewpwd',
      name: 'SetNewpwd',
      component: SetNewpwd
    }
  ]
})

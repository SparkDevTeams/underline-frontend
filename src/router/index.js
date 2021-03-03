import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Explore from '../views/Explore.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  routes
})

export default router

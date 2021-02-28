import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Explore from '../views/Explore.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Explore',
    component: Explore
  },
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Explore from '../views/Explore.vue'
import About from '../views/About.vue'
import Signin from '../views/Signin.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import EditEvent from '../views/EditEvent.vue'
import ViewEvent from '../views/ViewEvent.vue'
import CreateEvent from '../views/CreateEvent'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Explore',
		component: Explore
	},
	{
		path: '/about',
		name: 'About',
		component: About
	},
	{
		path: '/signin',
		name: 'Signin',
		component: Signin
	},
	{
		path: '/user/:id',
		name: 'Profile',
		component: Profile
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin
	},
	{
		path: '/event/create',
		name: 'CreateEvent',
		component: CreateEvent
	},
	{
		path: '/event/edit/:id',
		name: 'EditEvent',
		component: EditEvent
	},
	{
		path: '/event/:id',
		name: 'ViewEvent',
		component: ViewEvent
	}
]

const router = new VueRouter({
	routes
})

export default router

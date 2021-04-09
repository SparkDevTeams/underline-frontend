import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false;
assetsPublicPath: '',

axios.defaults.baseURL = 'https://sparkdev-underline.herokuapp.com/'

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

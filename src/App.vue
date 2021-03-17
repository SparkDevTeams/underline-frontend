<template>
	<div id="app">
		<NavBar></NavBar>
		<router-view></router-view>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
	components: {
		NavBar
	},
	created() {
		if (window.localStorage.getItem('token')) {
			//if localstorage variable exists, make request to validate token end point
		} else {
			//if doesnt exist make the the token variable empty
			window.localStorage.setItem('token', '')
		}
	}
}
</script>

<style lang="scss">
@import './assets/global.scss';
@import './assets/fonts.css';

#app {
	@extend .clear;
	font-family: $font;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100vh;
	width: 100vw;
	@extend .flex-column;
	justify-content: flex-start;
}
</style>

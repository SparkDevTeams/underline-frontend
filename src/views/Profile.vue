<template>
	<div>
		<h1>{{ id }}</h1>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			id: this.$route.params.id
		}
	},
	methods: {},
	mounted() {
		console.log(this.id)
	},
	watch: {
		$route(to, from) {
			this.id = this.$route.params.id
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/global.scss';
</style>

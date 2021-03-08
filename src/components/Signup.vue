<template>
	<div id="signup-component">
		<h1>Signup</h1>

		<label>First Name</label>
		<input v-model="firstName" @change="isValid" />

		<label>Last Name</label>
		<input v-model="lastName" />

		<label>Email</label>
		<input v-model="email" />

		<label>Password</label>
		<input v-model="password" type="password" />

		<label>Confirm Password</label>
		<input v-model="confirmPassword" type="password" />

		<button @click="signup">Submit</button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	},
	methods: {
		isValid() {},
		signup() {
			if (this.isValid()) {
				const signUpData = {}

				signUpData.firstName = this.firstName
				signUpData.lastName = this.firstName
				signUpData.email = this.firstName
				signUpData.password = this.firstName
				axios({
					method: 'post',
					url: 'https://sparkdev-underline.herokuapp.com/users/register',
					data: signUpData
				})
					.then(response => {
						console.log(response)
					})
					.catch(e => {
						console.log(e)
					})
			}
		}
	},
	mounted() {}
}
</script>
<style lang="scss" scoped>
@import '../assets/global.scss';

#signup-component {
	@extend .shadow;
	background-color: white;
	height: min(500px, 45vh);
	width: min(500px, 45vw);
	border-radius: 15px;
	padding: 15px;
	box-sizing: border-box;
	@extend .flex-column;
	margin: 5vw;
}
</style>

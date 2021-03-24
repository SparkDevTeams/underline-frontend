<template>
	<div id="login-component">
		<h1>Login</h1>

		<label>Email address</label>
		<input v-model="email" type="email" />

		<label>Password</label>
		<input v-model="password" type="password" />

		<button @click="login">Submit</button>

		<span v-if="showErrorMessage"> Incorrect email or password</span>
	</div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
	data() {
		return {
			email: '',
			password: '',
			showErrorMessage: false
		}
	},
	methods: {
		valid() {
			return true
		},

		login() {
			if (this.valid()) {
				this.showErrorMessage = false

				var formData = {
					identifier: {
						email: this.email
					},
					password: this.password
				}

				axios({
					method: 'post',
					url: 'https://sparkdev-underline.herokuapp.com/users/login',
					data: formData
				})
					.then(response => {
						window.localStorage.setItem('token', response.data.jwt)
						// route to user's profile
						router.push({
							path: '/user/',
							params: { id: response.data.user_id }
						})
					})
					.catch(error => {
						console.log(error)
						// display error message
						this.showErrorMessage = true
					})
			}
		}
	},
	mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../assets/global.scss';

#login-component {
	@extend .shadow;
	background-color: white;
	height: min(500px, 45vh);
	width: min(500px, 45vw);
	border-radius: 15px;
	padding: 20px;
	box-sizing: border-box;
	@extend .flex-column;
	margin: 5vw;

	span {
		@extend .flex-column;
		border: 1px solid white;
		background-color: rgba(255, 0, 0, 0.4);
		margin-top: 10px;
		width: 18vw;
		height: 2vw;
		padding: 20px;
		box-sizing: border-box;
	}

	button {
		@extend .button;
		margin-top: 10px;
		background: color(green);
		width: 5vw;
		height: 2vw;
		border-radius: 5px;
		font-family: $font;
	}
}
</style>

<template>
	<div id="signup-component">
		<h1>Signup</h1>

		<label>First Name</label>
		<input v-model="signUpData.firstName" @change="validateName" />

		<label>Last Name</label>
		<input v-model="signUpData.lastName" @change="validateName" />

		<label>Email</label>
		<input v-model="signUpData.email" @change="validateEmail" />

		<label>Password</label>
		<input
			v-model="signUpData.password"
			type="password"
			@change="validatePasswordsAreSame"
		/>

		<label>Confirm Password</label>
		<input
			v-model="signUpData.confirmPassword"
			type="password"
			@change="validatePasswordsAreSame"
		/>

		<button @click="signup">Submit</button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			signUpData: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: ''
			},
			hasError: false
		}
	},
	methods: {
		validateName() {
			//Checks if there is numbers on firstName var
			if (!this.signUpData.firstName.match(/^([^0-9]*)$/)) {
				console.log('Please check your first name.')
				this.hasError = true
			} else {
				console.log('Your first name is valid.')
				this.hasError = false
			}

			//Checks if there is numbers on lastName var
			if (!this.signUpData.lastName.match(/^([^0-9]*)$/)) {
				console.log('Please check your last name.')
				this.hasError = true
			} else {
				console.log('Your last name is valid.')
				this.hasError = false
			}
		},
		validateEmail() {
			//Checks email format is correct.
			if (!this.signUpData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
				console.log('Please provide valid email.')
				this.hasError = true
			} else {
				console.log('Your email is valid.')
				this.hasError = false
			}
		},
		validatePasswordsAreSame() {
			//Checks if passwords match
			if (this.signUpData.password !== this.signUpData.confirmPassword) {
				console.log('Please check your passwords match')
				this.hasError = true
			} else {
				console.log('Your passwords match')
				this.hasError = false
			}
		},
		validate() {
			//Checks if inputs are empty
			if (
				this.signUpData.firstName == '' ||
				this.signUpData.lastName == '' ||
				this.signUpData.email == '' ||
				this.signUpData.password == '' ||
				this.signUpData.password == '' ||
				this.signUpData.confirmPassword == ''
			) {
				console.log('Something went wrong, please check input.')
				this.hasError = true
			} else {
				this.hasError = false
			}

			//if hasError is false then it will return true
			if (!this.hasError) {
				return true
			}
		},
		signup() {
			if (this.validate()) {
				axios({
					method: 'post',
					url: 'https://sparkdev-underline.herokuapp.com/users/register',
					data: this.signUpData
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

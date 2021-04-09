<template>
	<div id="profile-container">
		<div class="edit-profile" v-if="ownerOnPage">
			<div class="image">
				<div
					v-if="imageURL"
					class="image__container"
					@click="$refs.imgUpload.click()"
				>
					<img :src="imageURL" class="image__preview" />
					<input
						type="file"
						ref="imgUpload"
						class="image__input"
						style="display: none"
						@change="uploadImage"
					/>
					<div class="image__overlay">
						<div class="image__title">Change Profile Pic</div>
					</div>
				</div>

				<div v-if="!imageURL" class="image__container-before">
					<div
						v-if="!image_id"
						@click="$refs.imgUpload.click()"
						class="image__button-before"
					>
						<div class="image__overlay">
							<div class="image__title">Change Profile Pic</div>
						</div>
					</div>

					<div
						v-if="image_id"
						@click="$refs.imgUpload.click()"
						class="image__button-before"
					>
						<img
							v-if="image_id"
							:src="
								'https://sparkdev-underline.herokuapp.com/images/get?image_id=' +
									image_id
							"
							@click="$refs.imgUpload.click()"
						/>
						<div class="image__overlay">
							<div class="image__title">Change Profile Pic</div>
						</div>
					</div>

					<input
						type="file"
						ref="imgUpload"
						class="image__input-before"
						@change="uploadImage"
					/>
				</div>
			</div>
			<div class="profile-name">
				<h1>{{ `${this.firstName} ${this.lastName}` }}</h1>
			</div>

			<div class="error-message-container" v-if="errorMessages.length > 0">
				<p>The following errors occurred:</p>
				<ul>
					<li v-for="(message, index) in errorMessages" :key="index">
						{{ message }}
					</li>
				</ul>
			</div>

			<div class="profile-links">
				<label> Social Media Links: </label>
				<input
					type="text"
					v-model="userLinks[0]"
					placeholder="https://instagram.com"
					@change="validateLinks"
				/>
				<input
					type="text"
					v-model="userLinks[1]"
					placeholder="https://facebook.com"
					@change="validateLinks"
				/>
				<input
					type="text"
					v-model="userLinks[2]"
					placeholder="https://twitter.com"
					@change="validateLinks"
				/>
				<div class="buttons">
					<button @click="onSubmit" class="submit-btn">
						Submit All
					</button>
					<button @click="deleteUser" class="delete-btn">
						Delete user
					</button>
				</div>
			</div>
		</div>

		<div v-if="!ownerOnPage" id="profile-info">
			<img
				id="pic"
				:src="
					`https://sparkdev-underline.herokuapp.com/images/get?image_id=${image_id}`
				"
			/>
			<h1>{{ `${firstName} ${lastName}` }}</h1>
			<label> Social Media Links: </label>
			<div class="links">
				<a v-for="link in userLinks" :key="link" :href="link">{{ link }}</a>
			</div>
		</div>

		<div v-if="ownerOnPage" id="events-component">
			<h3 class="upcoming">Your saved events</h3>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
export default {
	data() {
		return {
			id: this.$route.params.id,
			ownerOnPage: false,
			firstName: '',
			lastName: '',
			userLinks: [],
			imageData: null,
			imageURL: '',
			image_id: '',
			errorMessages: [],
			errors: {
				firstLink: false,
				secondLink: false,
				thirdLink: false
			}
		}
	},
	methods: {
		getProfile() {
			var formData = {
				user_id: this.id
			}
			axios({
				method: 'post',
				url: '/users/find',
				data: formData
			})
				.then(response => {
					this.firstName = response.data.first_name
					this.lastName = response.data.last_name
					this.image_id = response.data.image_id
					this.userLinks[0] = response.data.user_links[0]
					this.userLinks[1] = response.data.user_links[1]
					this.userLinks[2] = response.data.user_links[2]
				})
				.catch(error => {
					console.log(error)
				})
		},
		uploadImage(e) {
			this.imageData = null
			this.imageURL = ''
			this.imageData = e.target.files
			this.imageURL = URL.createObjectURL(e.target.files[0])
		},
		checkToken() {
			let token = window.localStorage.getItem('token')
			if (token != '') {
				let userID = jwt_decode(token).user_id
				if (userID == this.id) {
					this.ownerOnPage = true
				}
			}
		},
		deleteUser() {
			axios({
				method: 'delete',
				url: '/users/delete',
				data: { user_id: this.id },
				headers: {
					token: window.localStorage.getItem('token')
				}
			})
				.then(response => {
					window.localStorage.setItem('token', '')
					this.$router.push('/signin')
				})
				.catch(error => {
					console.log(error)
				})
		},
		validateLinks(e) {
			let text = e.target.value
			let errorMessage = 'Make sure your website(s) starts with "https://" '

			if (text.trim().length > 0) {
				if (
					!text.match(
						/^(https:\/\/)+?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
					)
				) {
					if (!this.errorMessages.includes(errorMessage)) {
						this.errorMessages.push(errorMessage)
					}
				} else {
					this.errorMessages = this.errorMessages.filter(
						msg => msg !== errorMessage
					)
				}
			}
		},
		async onSubmit() {
			if (this.imageData != null) {
				let fd = new FormData()
				fd.append('file', this.imageData[0])
				await axios({
					method: 'post',
					url: '/images/upload',
					data: fd,
					headers: {
						token: window.localStorage.getItem('token')
					}
				})
					.then(response => {
						this.image_id = response.data.image_id
						this.updateUser()
					})
					.catch(error => {
						console.log(error)
					})
			} else {
				this.updateUser()
			}
		},
		async updateUser() {
			this.userLinks = this.userLinks.filter(link => {
				return link !== undefined && link !== ''
			})

			await axios({
				method: 'patch',
				url: '/users/update',
				data: {
					user_links: this.userLinks,
					image_id: this.image_id,
					identifier: {
						user_id: this.id
					}
				},
				headers: {
					token: window.localStorage.getItem('token')
				}
			})
				.then(response => {
					this.getProfile()
				})
				.catch(error => {
					console.log(error)
				})
		}
	},
	created() {
		this.getProfile()
		this.checkToken()
	},
	watch: {
		$route(to, from) {
			this.id = this.$route.params.id
			this.getProfile()
		}
	}
}

</script>

<style lang="scss" scoped>
@import '../assets/global.scss';

#pic {
	width: 300px;
	height: 300px;
	border-radius: 50%;
}

h1 {
	text-align: center;
	text-decoration: underline;
}

#profile-container {
	width: 100%;
	height: 100%;
	@extend .flex-column;
	padding-top: 10px;

	button {
		@extend .button;
		margin-top: 20px;

		border-radius: 5px;
		width: 200px;
		height: 50px;
		font-size: 20px;
		font-weight: 300;
		margin-bottom: 30px;
	}

	.edit-profile {
		@extend .flex-column;

		.image {
			@extend .flex-row;
			width: 80%;
			justify-content: space-around;

			.image__container {
				position: relative;
				border-radius: 5.5px;
				cursor: pointer;
				width: 300px;
				height: 300px;
				border-radius: 50%;

				.image__input {
					display: none;
				}

				.image__preview {
					display: block;
					width: 300px;
					height: 300px;
					border-radius: 50%;
				}

				.image__overlay {
					position: absolute;
					top: 0;
					right: 0;
					height: 100%;
					width: 100%;
					border-radius: 50%;
					background: rgba(0, 0, 0, 0.6);
					color: white;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-content: center;
					opacity: 0;
					transition: opacity 0.25s ease;
					.image__title {
						width: 100%;
						height: auto;
						text-align: center;
						font-size: 2em;
						font-weight: bold;
					}
				}

				.image__overlay:hover {
					opacity: 1;
				}
			}

			.image__container-before {
				display: flex;
				position: relative;
				justify-content: center;

				img {
					width: 300px;
					height: 300px;
					border-radius: 50%;
				}

				.image__button-before {
					background: color(green);
					width: 300px;
					height: 300px;
					border-radius: 50%;
					cursor: pointer;

					.image__overlay {
						position: absolute;
						top: 0;
						right: 0;
						height: 100%;
						width: 100%;
						border-radius: 50%;

						background: rgba(0, 0, 0, 0.6);
						color: white;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-content: center;
						opacity: 0;
						transition: opacity 0.25s ease;
						.image__title {
							width: 100%;
							height: auto;
							text-align: center;
							font-size: 2em;
							font-weight: bold;
						}
					}

					.image__overlay:hover {
						opacity: 1;
					}
				}
				.image__input-before {
					display: none;
				}
			}
		}

		.profile-name {
			text-align: center;
		}
		.profile-links {
			@extend .flex-column;
			width: 100%;

			input {
				width: 200px;
				border: 2px solid black;
				border-radius: 5px;
			}

			.buttons {
				@extend .flex-row;
				width: 500px;
				justify-content: space-evenly;
			}
			.submit-btn {
				background: color(green);
				font-weight: bold;
			}
			.delete-btn {
				background: rgba(255, 0, 0, 0.8);
				font-weight: bold;
			}
		}
		.error-message-container {
			@extend .flex-column;
			background: rgba(255, 0, 0, 0.4);
			width: 70%;
			border-radius: 5px;
			margin-bottom: 10px;
		}
	}
	#events-component {
		width: 100%;
		text-align: center;

		.upcoming,
		.past {
			color: #03bf4d;
			font-size: 23px;
		}
	}

	.links {
		@extend .flex-column;

		a {
			margin-top: 5px;
			text-decoration-color: color(green);
			text-decoration-thickness: 2px;
			padding-left: 20px;
			width: 100%;
			color: black;
			transition: all 0.5s ease;
		}
		a:hover {
			padding-left: 100px;
		}
	}
}
</style>

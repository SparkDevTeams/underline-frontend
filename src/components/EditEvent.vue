<template>
	<div id="edit-event-container">
		<h1>Create your event</h1>
		<div class="error-message-container" v-if="errorMessages.length > 0">
			<p>The following errors occurred:</p>
			<ul>
				<li v-for="(message, index) in errorMessages" :key="index">
					{{ message }}
				</li>
			</ul>
		</div>

		<div class="image">
			<label>Event image:</label>
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
					@change="uploadImage"
					multiple
				/>
				<div class="image__overlay">
					<div class="image__title">Browse...</div>
				</div>
			</div>
			<div v-if="!imageURL" class="image__container-before">
				<button @click="$refs.imgUpload.click()" class="image__button-before">
					Upload Image
				</button>
				<input
					type="file"
					ref="imgUpload"
					class="image__input-before"
					@change="uploadImage"
					multiple
				/>
			</div>
			<div class="image__container-multiple" v-if="imageURL.length > 1">
				<p class="image__multiple-count">+{{ imageCounter - 1 }}</p>
			</div>
		</div>

		<div class="input-wrapper">
			<label>Event name:</label>
			<input
				type="text"
				id="event-name"
				v-model="eventData.title"
				@change="validateTitle"
			/>
		</div>

		<div class="input-wrapper">
			<label>Event description:</label>
			<textarea
				id="event-description"
				v-model="eventData.description"
				@change="validateDescription"
			></textarea>
		</div>

		<div class="input-wrapper">
			<label>Event start time:</label>
			<datetime
				v-model="eventData.date_time_start"
				type="datetime"
				use12-hour
				:minute-step="15"
				:min-datetime="minDateTime"
			></datetime>
		</div>

		<div class="input-wrapper">
			<label>Event end time</label>
			<datetime
				v-model="eventData.date_time_end"
				type="datetime"
				use12-hour
				:minute-step="15"
				:min-datetime="eventData.date_time_start"
			></datetime>
		</div>

		<div class="input-wrapper">
			<label>Tags:</label>
			<div id="tags-container">
            	<div v-for="tag in tags" @click="tag.active=!tag.active" :class="{active:tag.active}" :key="tag.id">{{tag.title}}</div>
        	</div>
		</div>

		<div class="input-wrapper">
			<label>Event location:</label>
			<select v-model="eventData.location" @change="validateLocation">
				<option
					v-for="location in locationList"
					:key="location.title"
					:value="location"
					>{{ location.title }}</option
				>
			</select>
		</div>

		<div class="input-wrapper">
			<label>Max Capacity:</label>
			<input
				type="number"
				id="event-max"
				v-model="eventData.max_capacity"
				@change="validateMaxCapacity"
			/>
		</div>

		<div class="input-wrapper">
			<label>Please enter any website or social media link(s):</label>
			<div id="link-inputs">
				<input
					placeholder="https://example.com"
					type="text"
					id="event-link-1"
					@change="addLink"
				/>
				<input
					placeholder="https://example.com"
					type="text"
					id="event-link-2"
					@change="addLink"
				/>
				<input
					placeholder="https://example.com"
					type="text"
					id="event-link-3"
					@change="addLink"
				/>
				<input
					placeholder="https://example.com"
					type="text"
					id="event-link-4"
					@change="addLink"
				/>
			</div>
		</div>

		<div class="input-wrapper">
			<label>Will this event be public or private?</label>
			<div id="private-checkbox" @click="checkBox">
				<input
					type="checkbox"
					:class="eventData.public ? 'checked' : ''"
					v-model="eventData.public"
				/>
				<label>Public</label>
			</div>
		</div>

		<div class="input-wrapper">
			<button @click="onSubmit" id="submit-btn">Submit</button>
			<button @click="onCancel" id="cancel-btn">Cancel</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { DateTime as dt } from 'luxon'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import jwt_decode from 'jwt-decode'
export default {
	data() {
		return {
			eventData: {
				title: '',
				description: '',
				date_time_start: dt.now().toISO(),
				date_time_end: dt.now().toISO(),
				tags: [],
				public: true,
				location: {},
				max_capacity: 0,
				links: [],
				image_ids: [],
				creator_id: ''
			},
			tags: [
                    {title: "Sports", id: "sport_event", active: false},
                    {title: "Food", id: "food_event", active: false},
                    {title: "Art", id: "art_event", active: false},
                    {title: "Music", id: "music_event", active: false},
                    {title: "Meeting", id: "meeting_event", active: false},
                    {title: "Class", id: "class_event", active: false},
                    {title: "Paid", id: "paid_event", active: false},
            ],
			minDateTime: dt.now().toString(),
			locationList: [
				{
					title: 'The River Room',
					latitude: 25.765406,
					longitude: -80.195470
				},
				{
					title: 'The Urban Gym',
					latitude: 25.766076,
					longitude: -80.195516
				},
				{
					title: 'The Promenade',
					latitude: 25.764406,
					longitude: -80.195457
				},
				{
					title: 'The Oolite Room',
					latitude: 25.762945,
					longitude: -80.195357
				},
			],
			imageData: null,
			imageURL: '',
			imageCounter: 0,
			errorMessages: [],
			errors: {
				titleError: false,
				descriptionError: false,
				tagsError: false,
				locationError: false,
				maxCapacityError: false,
				linksError: false
			},
			hasErrors: false,
			token: ''
		}
	},
	methods: {
		addLink(e) {
			const text = e.target.value
			this.validateLinks(text)
		},
		validateLinks(text) {
			let errorMessage = 'Make sure your website(s) starts with "https://" '
			let duplicateMessage = 'Make sure your website(s) are not repeated'
			if (text.trim().length > 0) {
				if (
					!text.match(
						/^(https:\/\/)+?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
					)
				) {
					if (!this.errorMessages.includes(errorMessage)) {
						this.errorMessages.push(errorMessage)
					}

					this.errors.linksError = true
				} else if (this.eventData.links.includes(text)) {
					if (!this.errorMessages.includes(errorMessage)) {
						this.errorMessages.push(duplicateMessage)
					}

					this.errors.linksError = true
				} else {
					this.eventData.links.push(text)
					this.errorMessages = this.errorMessages.filter(
						msg => msg !== errorMessage
					)
					this.errorMessages = this.errorMessages.filter(
						msg => msg !== duplicateMessage
					)
					this.errors.linksError = false
				}
			} else {
				this.errorMessages = this.errorMessages.filter(
					msg => msg !== errorMessage
				)
				this.errorMessages = this.errorMessages.filter(
					msg => msg !== duplicateMessage
				)
				this.errors.linksError = false
			}
		},
		checkToken() {
			this.token = window.localStorage.getItem('token')
			if (this.token != '') {
				this.eventData.creator_id = jwt_decode(this.token).user_id
			} else {
				this.onCancel()
			}
		},
		uploadImage(e) {
			this.imageData = null
			this.imageURL = ''
			this.imageCounter = e.target.files.length
			this.imageData = e.target.files
			this.imageURL = URL.createObjectURL(e.target.files[0])
		},
		async onSubmit() {
			this.validateTitle()
			this.validateDescription()
			this.validateLocation()
			this.validateMaxCapacity()

			for (const key in this.errors) {
				if (this.errors[key] == true) {
					this.hasErrors = true
				}
			}
			if (!this.hasErrors) {
				for (const tag of this.tags) {
                    if(tag.active==true) {
                        this.eventData.tags.push(tag.id)
                    }
                }
				if (this.imageData) {
					for (let i = 0; i < this.imageCounter; i++) {
						let fd = new FormData()
						fd.append('name', this.imageData[i].name)
						fd.append('file', this.imageData[i])
						await axios({
							method: 'post',
							url: '/images/upload',
							data: fd,
							headers: {
								token: this.token
							}
						})
							.then(response => {
								this.eventData.image_ids.push(response.data.image_id)
							})
							.catch(error => {
								console.log(error)
							})
					}
				}
				axios({
					method: 'post',
					url: '/events/register',
					data: this.eventData,
					headers: {
						token: this.token
					}
				})
					.then(response => {
						const eventId = response.data.event_id
						this.$router.push({
							path: `/event/${eventId}`,
							params: { id: eventId }
						})
					})
					.catch(error => {
						console.log(error)
					})
			}
		},
		onCancel() {
			this.$router.push({
				path: `/`
			})
		},
		checkBox() {
			this.eventData.public = !this.eventData.public
		},
		validateTitle() {
			let errorMessage = 'Please make sure this event has a title'
			if (this.eventData.title == '') {
				if (!this.errorMessages.includes(errorMessage)) {
					this.errorMessages.push(errorMessage)
				}

				this.errors.titleError = true
			} else {
				this.errorMessages = this.errorMessages.filter(
					msg => msg !== errorMessage
				)
				this.errors.titleError = false
			}
		},
		validateDescription() {
			let errorMessage = 'Please make sure this event has a description'
			if (this.eventData.description == '') {
				if (!this.errorMessages.includes(errorMessage)) {
					this.errorMessages.push(errorMessage)
				}
				this.errors.descriptionError = true
			} else {
				this.errorMessages = this.errorMessages.filter(
					msg => msg !== errorMessage
				)
				this.errors.descriptionError = false
			}
		},
		validateTags() {
			let errorMessage = 'Please make sure this event has a tag'
			if (this.eventData.tags.length == 0) {
				if (!this.errorMessages.includes(errorMessage)) {
					this.errorMessages.push(errorMessage)
				}
				this.errors.tagsError = true
			} else {
				this.errorMessages = this.errorMessages.filter(
					msg => msg !== errorMessage
				)
				this.errors.tagsError = false
			}
		},
		validateLocation() {
			let errorMessage = 'Please make sure you select a location for this event'
			if (!this.eventData.location) {
				if (!this.errorMessages.includes(errorMessage)) {
					this.errorMessages.push(errorMessage)
				}
				this.errors.locationError = true
			} else {
				this.errorMessages = this.errorMessages.filter(
					msg => msg !== errorMessage
				)
				this.errors.locationError = false
			}
		},
		validateMaxCapacity() {
			let errorMessage =
				'Please make sure you allow at least 1 person to attend'
			if (this.eventData.max_capacity <= 0) {
				if (!this.errorMessages.includes(errorMessage)) {
					this.errorMessages.push(errorMessage)
				}
				this.errors.maxCapacityError = true
			} else {
				this.errorMessages = this.errorMessages.filter(
					msg => msg !== errorMessage
				)
				this.errors.maxCapacityError = false
			}
		}
	},
	mounted() {
		this.checkToken()
	},
	components: {
		datetime: Datetime
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/global.scss';
#edit-event-container {
	@extend .flex-column;
	box-shadow: 6px 9px 0px 1px #000000;
	width: 80vw;
	height: auto;
	border-radius: 5px;
	border: 1px solid black;
	margin-top: 50px;
	margin-bottom: 50px;


	#tags-container {
        @extend .flex-row;
        flex-wrap: wrap;
        max-width: 90vw;

        > div {
            user-select: none;
            margin: 4px;
            cursor: pointer;
            background-color: color(grey);
            color: white;
            padding: 5px 15px;
            border-radius: 30px;
        }

        .active {
            background-color: color(green);
            color: white;
        }
    }

	h1 {
		color: color(green);
		border-bottom: 5px solid black;
		cursor: default;
		font-size: 40px;
	}

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

	button#submit-btn {
		background: color(green);
	}

	button#cancel-btn {
		background: rgba(255, 0, 0, 0.8);
	}

	.image {
		@extend .flex-row;
		width: 80%;
		justify-content: space-around;

		label {
			margin-right: 20%;
			padding: 0px;
			text-align: left;
			width: 90%;
			font-size: 26px;
			letter-spacing: 1.5px;
		}
		.image__container {
			position: relative;
			border: 1px solid black;
			border-radius: 5.5px;
			cursor: pointer;
			width: 500px;

			.image__input {
				display: none;
			}

			.image__preview {
				display: block;
				width: 100%;
				border-radius: 5px;
			}

			.image__overlay {
				position: absolute;
				top: 0;
				right: 0;
				height: 100%;
				width: 100%;
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
			width: 500px;
			display: flex;
			justify-content: center;
			.image__button-before {
				background: color(green);
			}
			.image__input-before {
				display: none;
			}
		}
		.image__container-multiple {
			border-radius: 50%;
			width: 125px;
			margin-left: 10px;
			background: color(green);
			display: flex;
			justify-content: center;
			align-content: center;
			color: white;
			border: 2px solid black;

			.image__multiple-count {
				text-align: center;
				cursor: default;
			}
		}
	}

	.input-wrapper {
		@extend .flex-row;
		width: 80%;
		justify-content: space-around;
		margin: 10px 0;

		label {
			padding: 0px;
			text-align: left;
			width: 90%;
			font-size: 26px;
			letter-spacing: 1.5px;
		}

		input {
			width: 500px;
			height: 20px;
			border: none;
			border-bottom: 2px solid black;
		}

		input#event-max {
			width: 40px;
		}

		textarea {
			resize: none;
			width: 500px;
			height: 100px;
			border: 2px solid black;
		}

		select {
			width: 200px;
			height: 20px;
			border: none;
			border-bottom: 2px solid black;
		}

		#link-inputs {
			padding: 0;
			width: 500px;
			input {
				width: 100%;
			}
		}

		#private-checkbox {
			@extend .flex-row;
			width: 500px;
			justify-content: flex-end;
			label {
				font-size: 20px;
				width: auto;
				cursor: pointer;
				-webkit-user-select: none; /* Safari */
				-moz-user-select: none; /* Firefox */
				-ms-user-select: none; /* IE10+/Edge */
				user-select: none; /* Standard */
			}

			input {
				width: 20px;
			}
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
@media (min-width: 1000px) {
	#edit-event-container {
		width: 70vw;

		h1 {
			font-size: 48px;
		}
	}
}
@media (min-width: 1250px) {
	#edit-event-container {
		width: 60vw;
	}
}
@media (min-width: 1500px) {
	#edit-event-container {
		width: 50vw;
	}
}
</style>

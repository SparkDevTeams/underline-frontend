<template>
	<div id="edit-event-container">
		<h1>{{ componentTitle }} your event</h1>
		<div class="error-message-container" v-if="errorMessages.length > 0">
			<p>The following errors occurred:</p>
			<ul>
				<li v-for="(message, index) in errorMessages" :key="index">
					{{ message }}
				</li>
			</ul>
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
			<select v-model="eventData.tags" @change="validateTags">
				<option :value="['sporting_events']">Sporting Event</option>
				<option :value="['food_events']">Food Event</option>
				<option :value="['art_expo']">Art Expo</option>
				<option :value="['music_show']">Music Show</option>
			</select>
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
				<input type="text" id="event-link-1" v-model="eventData.links[0]" />
				<input type="text" id="event-link-2" v-model="eventData.links[1]" />
				<input type="text" id="event-link-3" v-model="eventData.links[2]" />
				<input type="text" id="event-link-4" v-model="eventData.links[3]" />
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
import EditEvent from '../components/EditEvent'
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
				creator_id: ""
			},
			minDateTime: dt.now().toString(),
			locationList: [
				{
					title: 'Miami, FL',
					latitude: 12,
					longitude: 15
				},
				{
					title: 'Brickell, FL',
					latitude: 12,
					longitude: 15
				},
				{
					title: 'Hialeah, FL',
					latitude: 12,
					longitude: 15
				}
			],
			errorMessages: [],
			errors: {
				titleError: false,
				descriptionError: false,
				tagsError: false,
				locationError: false,
				maxCapacityError: false
			},
			hasErrors: false,
			token: ''
		}
	},
	props: ['componentTitle', 'eventId'],
	methods: {
		checkToken() {
			this.token = window.localStorage.getItem('token');
			if (this.token != '') {
				this.eventData.creator_id = jwt_decode(this.token).user_id;
			} else {
				this.onCancel();
			}
		},
		onSubmit() {
			this.validateTitle()
			this.validateDescription()
			this.validateTags()
			this.validateLocation()
			this.validateMaxCapacity()
			for (const key in this.errors) {
				if (this.errors[key] == true) {
					this.hasErrors = true
				}
			}
			if (!this.hasErrors) {
				axios({
					method: 'post',
					url: '/events/register',
					data: this.eventData,
					headers: {
						'token': this.token
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
				this.errorMessages.push(errorMessage)
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
				this.errorMessages.push(errorMessage)
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
				this.errorMessages.push(errorMessage)
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
				this.errorMessages.push(errorMessage)
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
				this.errorMessages.push(errorMessage)
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
		this.checkToken();
	},
	components: {
		datetime: Datetime,
		editEvent: EditEvent
	},
	watch: {
		$route(to, from) {
			this.eventData.id = this.$route.params.id
		}
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
			width: 50px;
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

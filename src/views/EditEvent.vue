<template>
	<div id="edit-event-container">
		<h1>Create your event</h1>
		<div class="input-wrapper">
			<label>Event name:</label>
			<input type="text" id="event-name" v-model="eventData.title" />
		</div>

		<div class="input-wrapper">
			<label>Event description:</label>
			<textarea
				id="event-description"
				v-model="eventData.description"
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
			<select v-model="eventData.tags">
				<option :value="['sporting_events']">Sporting Event</option>
				<option :value="['food_events']">Food Event</option>
				<option :value="['art_expo']">Art Expo</option>
				<option :value="['music_show']">Music Show</option>
			</select>
		</div>

		<div class="input-wrapper">
			<label>Event location:</label>
			<select v-model="eventData.location" @change="onSelectLocation">
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
			<input type="number" id="event-max" v-model="eventData.max_capacity" />
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
import 'vue-datetime/dist/vue-datetime.css'
export default {
	data() {
		return {
			eventData: {
				id: this.$route.params.id,
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
				creator_id: window.localStorage.getItem('token')
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
			]
		}
	},
	methods: {
		async onSubmit() {
			await axios({
				method: 'post',
				url: '/events/register',
				data: this.eventData
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
		},
		onCancel() {
			this.$router.push({
				path: `/`
			})
		},
		getEventData() {
			if (this.eventData.id !== undefined) {
				axios({
					method: 'get',
					url: `/events/get/${this.eventData.id}`
				})
					.then(response => {
						this.eventData.title = response.data.title
						this.eventData.description = response.data.description
						this.eventData.date_time_start = response.data.date_time_start
						this.eventData.date_time_end = response.data.date_time_end
						this.eventData.tags = response.data.tags
						this.eventData.public = response.data.public
						this.eventData.location = response.data.location
						this.eventData.max_capacity = response.data.max_capacity
						this.eventData.links = response.data.links
						this.eventData.image_ids = response.data.image_ids
						this.eventData.creator_id = response.data.creator_id
					})
					.catch(error => {
						console.log(error)
					})
			}
		},
		checkBox() {
			this.eventData.public = !this.eventData.public
		}
	},
	mounted() {},
	components: {
		datetime: Datetime
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

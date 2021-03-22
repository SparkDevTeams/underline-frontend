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
			<input
				type="datetime-local"
				id="event-start"
				v-model="eventData.startDate"
			/>
		</div>

		<div class="input-wrapper">
			<label>Event end time</label>
			<input type="datetime-local" id="event-end" v-model="eventData.endDate" />
		</div>

		<div class="input-wrapper">
			<label>Tags:</label>
			<textarea id="event-tags" v-model="eventData.tags"></textarea>
		</div>

		<div class="input-wrapper">
			<label>Event location:</label>
			<input type="text" id="event-location" v-model="eventData.location" />
		</div>

		<div class="input-wrapper">
			<label>Max Attendees:</label>
			<input type="number" id="event-max" v-model="eventData.maxCapacity" />
		</div>

		<div class="input-wrapper">
			<label>Website link:</label>
			<input type="text" id="event-link" v-model="eventData.link" />
		</div>

		<button @click="onSubmit">Submit</button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			eventData: {
				id: this.$route.params.id,
				title: '',
				description: '',
				startDate: '',
				endDate: '',
				tags: '',
				location: '',
				maxCapacity: 0,
				link: ''
			}
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
					router.push({
						path: `/event/:${eventId}`,
						params: { id: eventId }
					})
				})
				.catch(error => {
					console.log(error)
				})
		}
	},
	mounted() {},
	components: {},
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
		background: color(green);
		border-radius: 5px;
		width: 200px;
		height: 50px;
		font-size: 20px;
		font-weight: 300;
		margin-bottom: 30px;
	}

	.input-wrapper {
		@extend .flex-row;
		width: 80%;
		justify-content: space-around;
		margin: 5px 0;

		label {
			padding: 0;
			text-align: left;
			width: 100%;
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
			width: 80px;
		}

		textarea {
			resize: none;
			width: 500px;
			height: 100px;
			border: 2px solid black;
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

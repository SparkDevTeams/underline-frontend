<template>
	<div id="smart-event-container">
		<div id="smart-event">
			<p>I want to have a</p>
			<i class="fas fa-map-marker-alt"></i>

			<input
				v-model="event.eventName"
				@click="clearEventNameText"
				id="event-name"
			/>
			<p>on</p>

			<i class="fas fa-map-marker-alt"></i>
			<input type="date" id="event-date" v-model="event.eventDate" />
			<p>in</p>
			<i class="fas fa-map-marker-alt"></i>
			<input
				id="event-location"
				v-model="event.eventLocation"
				@click="clearEventLocationText"
			/>

			<button @click="onSubmit">Create Event</button>
		</div>
		<div id="smart-event-error" v-if="showErrorMsg">
			<p>{{ errorMsg }}</p>
			<i @click="toggleCloseError" class="fas fa-times-circle"></i>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
export default {
	name: 'SmartEvent',
	data() {
		return {
			event: {
				eventName: 'Kids Scavenger Hunt',
				eventDate: new moment().format('YYYY-MM-DD'),
				eventLocation: 'Brickell, FL'
			},
			user: {
				isAdmin: true
			},
			showErrorMsg: false,
			errorMsg: 'You must be an admin to create an event'
		}
	},
	methods: {
		onSubmit() {
			if (this.user.isAdmin) {
				this.$router.push({
					path: '/event/create'
				})
			} else {
				this.showErrorMsg = true
			}
		},
		toggleCloseError() {
			this.showErrorMsg = false
		},
		clearEventNameText(e) {
			e.target.setSelectionRange(0, this.event.eventName.length)
		},
		clearEventLocationText(e) {
			e.target.setSelectionRange(0, this.event.eventLocation.length)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/global.scss';
#smart-event-container {
	@extend .shadow;
	margin-top: 0px;
	height: 15vh;
	width: 96vw;
	background-color: black;
	border-radius: 0px 0px 10px 10px;
	@extend .flex-column;

	#smart-event {
		@extend .flex-row;

		p {
			color: white;
			margin: 0px 20px;
		}

		i {
			color: color(green);
			margin-right: 15px;
		}

		input {
			font-family: $font;
			background-color: #000;
			display: block;
			border: none;
			border-bottom: 2px solid color(green);
			color: white;
			overflow: hidden;
			letter-spacing: 2px;
			outline: none;
		}

		input[type='date']::-webkit-calendar-picker-indicator {
			background-color: #fff;
			border-radius: 50px;
		}

		button {
			@extend .button;
			margin-left: 50px;
			width: 10vw;
			height: 5vh;
			background: color(green);
			border: none;
			border-radius: 5px;
			color: #fff;
			font-weight: 700;
			font-size: 1em;
			font-family: $font;
		}
	}

	#smart-event-error {
		@extend .flex-row;
		border: none;
		border-radius: 10px;
		background: #fff;
		display: inherit;
		margin-top: 10px;
		justify-content: center;
		align-content: center;

		p {
			color: #000;
			margin: 0 10px;
			width: 100%;
			align-self: center;
			text-align: center;
		}

		i {
			margin-right: 10px;
			cursor: pointer;
		}
	}
}
</style>

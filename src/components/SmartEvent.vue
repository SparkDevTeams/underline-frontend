<template>
	<div id="smart-event-container">
		<div id="smart-event">
			<p>I want to have a</p>
			<i class="fas fa-map-marker-alt"></i>

			<span contenteditable id="event-name">Kids Scavenger Hunt</span>
			<p>on</p>

			<i class="fas fa-map-marker-alt"></i>
			<span contenteditable id="event-date">date</span>
			<p>in</p>
			<i class="fas fa-map-marker-alt"></i>
			<span contenteditable id="event-location">Brickell</span>
			<button @click="toggleShowError">
				Create Event
			</button>
		</div>
		<div id="smart-event-error" v-if="showErrorMsg">
			<p>{{ errorMsg }}</p>
			<i @click="toggleCloseError" class="fas fa-times-circle"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SmartEvent',
	data() {
		return {
			showErrorMsg: false,
			errorMsg: 'You must be an admin to create an event',
			state: {
				opened: false,
				date: new Date()
			}
		}
	},
	methods: {
		toggleShowError() {
			this.showErrorMsg = true
		},
		toggleCloseError() {
			this.showErrorMsg = false
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/global.scss';
#smart-event-container {
	@extend .shadow;
	border: 1px solid white;
	margin-top: 2vh;
	height: 15vh;
	width: 96vw;
	background-color: black;
	border-radius: 0px 0px 10px 10px;
	@extend .flex-column;
	transition: 0.5s ease-out;

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

		span,
		.smart-event__date {
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

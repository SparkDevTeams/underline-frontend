<template>
	<div id="smart-event-container">
		<p>I want to have a</p>
		<i class="fas fa-map-marker-alt"></i>

		<span contenteditable id="event-name">Kids Scavenger Hunt</span>
		<p>on</p>
		<i class="fas fa-map-marker-alt"></i>

		<span contenteditable id="event-date">Saturday, February 20th, 2021</span>
		<p>in</p>
		<i class="fas fa-map-marker-alt"></i>
		<span contenteditable id="event-location">Brickell</span>
		<button>Create Event</button>
	</div>
</template>

<script>
export default {}
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
	@extend .flex-row;

	p {
		color: white;
		margin: 0px 20px;
	}

	i {
		color: color(green);
		margin-right: 15px;
	}

	span {
		background: #000;
		display: block;
		border: none;
		border-bottom: 2px solid color(green);
		color: white;
		overflow: hidden;
		letter-spacing: 2px;
		outline: none;
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
</style>

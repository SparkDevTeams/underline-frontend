<template>
    <div id="event-browser-component">
        <h3>{{ title }}</h3>
        <div id="tags-container" v-if="enableTags">
            <div v-for="tag in tags" @click="tag.active=!tag.active" :class="{active:tag.active}" :key="tag.id">{{tag.title}}</div>
        </div>
        <div id="event-browser-container">
            <div id="left-arrow" @click="displayNewEvents(false)"></div>
            <EventDisplay
                v-for="event in events"
                :title="event.title"
                :imageID="event.image_ids[0]"
                :tags="event.tags"
                :id="event.event_id"
                :key="event.event_id"
            ></EventDisplay>
            <div id="right-arrow" @click="displayNewEvents(true)"></div>
        </div>
    </div>
</template>

<script>
import EventDisplay from './EventDisplay.vue'
import axios from 'axios'
export default {
    name: "EventBrowser",
    data() {
        return {
            events: [],
            eventsDiplayed: [],
            numberOfEvents: 0,
            tags: [
                    {title: "Sports", id: "sport_event", active: false},
                    {title: "Food", id: "food_event", active: false},
                    {title: "Art", id: "art_event", active: false},
                    {title: "Music", id: "music_event", active: false},
                    {title: "Meeting", id: "meeting_event", active: false},
                    {title: "Class", id: "class_event", active: false},
                    {title: "Paid", id: "paid_event", active: false},
            ],
            index: 0
        };
    },
    props: ["title", "options", "enableTags"],
    methods: {
        computeNumberOfEvents() {
            let containerWidth = document.getElementById(
                "event-browser-container"
            ).offsetWidth;
            this.numberOfEvents = containerWidth / 240;
        },
        getEvents() {
            this.options.limit = this.numberOfEvents;
            this.options.index = this.index;
            if(this.enableTags){
                this.options.event_tag_filter = []
                for (const tag of this.tags) {
                    if(tag.active==true) {
                        this.options.event_tag_filter.push(tag.id)
                    }
                }
            }
            
            axios({
                method: "post",
                url: "https://sparkdev-underline.herokuapp.com/events/find/batch",
                data: this.options,
            })
                .then((response) => {
                    this.events = response.data.events;
                })
                .catch((e) => {});
        },
        displayNewEvents(directionIsRight) {
            if (directionIsRight) {
                this.index++;
                this.getEvents();
            } else {
                this.index--;
                if(this.index<0){
                    this.index = 0
                }
                this.getEvents();
            }
        },
    },
    mounted() {
        this.computeNumberOfEvents();
        this.getEvents();
    },
    watch: {
        tags: {
            handler(){
                this.getEvents();
            },
            deep: true
        }
    },
    components: {
        EventDisplay,
    },
};
</script>

<style lang="scss" scoped>
@import '../assets/global.scss';
@import '../assets/fonts.css';

#event-browser-component {
	font-family: $font;
	@extend .clear;
	width: 100%;
	box-sizing: border-box;
	@extend .flex-column;
	flex-wrap: wrap;

	h3 {
		font-size: max(3vmin, 35px);
		@extend .clear;
		text-align: center;
		margin-bottom: 1vw;
		max-width: 90vw;
	}

	#tags-container {
		@extend .flex-row;
		flex-wrap: wrap;
		max-width: 90vw;

		> div {
			user-select: none;
			margin: 10px;
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

	#event-browser-container {
		@extend .flex-row;
		justify-content: space-around;
		max-width: 100%;
		width: 100%;
		height: 100%;
		min-height: 300px;

		#left-arrow {
			height: 25px;
			width: 25px;
			border-radius: 30px 30px 30px 4px;
			rotate: 45deg;
			background: color(grey);
			cursor: pointer;
			@extend .button;
			&:hover {
				background: black;
				transform: color;
				transform: scale(1.2);
				transition: background 0.04s linear;
				transition: transform 0.04s;
				transition-timing-function: ease-in-out;
			}
		}

		#right-arrow {
			@extend #left-arrow;
			rotate: 225deg;
		}
	}
}
</style>

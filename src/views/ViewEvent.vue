<template>
    <div id="event-component">
        <div id="private" v-if="!eventData.public">
            This event is private. Only those with this link can view. {{ url }}
        </div>
        <h1>{{ eventData.title }}</h1>

        <img
            v-for="id in eventData.image_ids"
            :src="
                'https://sparkdev-underline.herokuapp.com/images/get?image_id=' +
                id
            "
        />
        <div id="tags">
            <span class="tag" v-for="tag in improvedTags">{{ tag }}</span>
        </div>

        <span id="description">{{ eventData.description }}</span>

        <span>Starts at {{ eventData.date_time_start }}</span>
        <span>Ends at {{ eventData.date_time_end }}</span>
        <span
            >Created by <router-link :to="'/user/' + eventData.creator_id"> {{creator.first_name}} {{creator.last_name}}</router-link></span
        >

        <h2>Located at {{ eventData.location.title }}</h2>

        <div id="dates">
            <span id="date-start">{{ eventData.dateTimeStart }}</span>
            <span id="date-end">{{ eventData.dateTimeEnd }}</span>
        </div>

        <div id="links">
            <a class="link" v-for="link in eventData.links" :href="link">{{
                link
            }}</a>
        </div>

        <div id="map_container">
            <MapView
                v-if="eventData.location.latitude"
                :pinLat="eventData.location.latitude"
                :pinLong="eventData.location.longitude"
            ></MapView>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import MapView from "../components/MapView.vue";
export default {
    data() {
        return {
            id: this.$route.params.id,
            url: window.location,
            imageurl: "https://sparkdev-underline.herokuapp.com/events/get/",
            eventData: {
                location: {},
            },
            creator: {},
            improvedTags: [],
        };
    },
    methods: {
        getEventData() {
            axios({
                method: "get",
                url: "/events/get/" + this.id,
            })
                .then((response) => {
                    this.eventData = response.data;
                    this.eventData.date_time_start = new Date(this.eventData.date_time_start)
                    this.eventData.date_time_start = this.eventData.date_time_start.setHours(this.eventData.date_time_start.getHours() - 4)
                    this.eventData.date_time_start = new Date(this.eventData.date_time_start)
                    this.eventData.date_time_start = this.eventData.date_time_start.toLocaleString();

                    this.eventData = response.data;
                    this.eventData.date_time_end = new Date(this.eventData.date_time_end)
                    this.eventData.date_time_end = this.eventData.date_time_end.setHours(this.eventData.date_time_end.getHours() - 4)
                    this.eventData.date_time_end = new Date(this.eventData.date_time_end)
                    this.eventData.date_time_end = this.eventData.date_time_end.toLocaleString();

                    this.improveTags();

                    axios({
                        method: "post",
                        url: "/users/find/",
                        data: {
                            user_id: this.eventData.creator_id,
                        },
                    }).then((response) => {
                        this.creator = response.data;
                        this.putPrivateEvent();
                    });
                })
                .catch((error) => {
                    this.eventData.title = "This event could not be found";
                });
        },
        improveTags(){
            for (const tag of this.eventData.tags.values()) {
                let newtag = tag.substr(0,(tag.indexOf('_')));
                newtag = newtag.charAt(0).toUpperCase() + newtag.slice(1);
                this.improvedTags.push(newtag);
            }
        },
        putPrivateEvent(){
            if(this.eventData.public==false){
                if(window.localStorage.getItem("token")!='') {
                    axios({
                            method: "put",
                            url: "/users/add_event",
                            data: {
                                event_id: this.id
                            },
                            headers: {
                                token: window.localStorage.getItem("token")
                            }
                       })
                            .then((response) => {
                            })
                            .catch((e) => {
                            });
                }
            }
            
        }
    },
    mounted() {
        this.getEventData();
        
    },
    components: {
        MapView,
    },
    watch: {
        $route(to, from) {
            this.id = this.$route.params.id;
            this.getEventData();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
#event-component {
    height: 89vh;
    width: 100%;
    @extend .flex-column;
    justify-content: flex-start;
    box-sizing: border-box;

    h1 {
        font-size: 10vh;
        text-align: center;
        @extend .clear;
        padding: 0px 20px;
    }

    #description {
        text-align: center;
    }

    #tags {
        @extend .flex-row;
        width: 80%;
        justify-content: space-around;
        flex-wrap: wrap;
        .tag {
            user-select: none;
            margin: 10px;
            background-color: color(green);
            color: white;
            padding: 5px 15px;
            border-radius: 30px;
            font-size: 12px;
        }
    }

    img {
        max-width: 530px;
        max-height: 505px;
        width: auto;
        height: auto;
    }

    #private {
        width: 100%;
        background-color: color(green);
        color: white;
        text-align: center;
        padding: 5px;
        box-sizing: border-box;
    }

    #max {
    }
    #dates {
        span {
        }
    }
    #links {
        @extend .flex-column;
        a {
            text-align: center;
        }
    }
    #map_container {
    }
}
</style>
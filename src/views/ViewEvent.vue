<template>
     <div id="event-component">
          <div id="private" v-if="!eventData.public">This event is private. Only those with this link can view. {{url}}</div>
          <h1>{{ eventData.title }}</h1>
          
          <img v-for="id in eventData.image_ids" src="https://sparkdev-underline.herokuapp.com/events/get/ + id"/>
          <span class="tag" v-for="tag in eventData.tags">{{ tag }}</span>
          <span id="description">{{eventData.description}}</span>

          <span>Starts at {{eventData.date_time_start}}</span>
          <span>Ends at {{eventData.date_time_end}}</span>
          <span>Created by {{}}</span>
          
          <h2>Located at {{ eventData.location.title }}</h2>
          

          <div id="dates">
               <span id="date-start">{{ eventData.dateTimeStart }}</span>
               <span id="date-end">{{ eventData.dateTimeEnd }}</span>
          </div>

          <div id="links">
               <a class="link" v-for="link in eventData.links" :href="link">{{ link }}</a>
          </div>

          <div id="map_container">
               <MapView
                    :pinLat="eventData.location.latitude"
                    :pinLong="eventData.location.longitude"
               ></MapView>
          </div>
     </div>
</template>

<script>
import axios from "axios";
import MapView from "../components/MapView.vue"
export default {
     data() {
          return {
               id: this.$route.params.id,
               url: window.location,
               eventData: {
                    location: {}
               },
               creator: {}
          };
     },
     methods: {
          getEventData() {
               axios({
                    method: "get",
                    url:
                         "https://sparkdev-underline.herokuapp.com/events/get/" + this.id,
               })
               .then((response) => {
                    this.eventData = response.data;
                    this.eventData.date_time_start = (new Date(this.eventData.date_time_start)).toLocaleString();
                    this.eventData.date_time_end = (new Date(this.eventData.date_time_end)).toLocaleString();
                    axios({
                         method: "get",
                         url:
                              "https://sparkdev-underline.herokuapp.com/users/find/",
                         data: {
                              user_id: this.eventData.creator_id
                         }
                    })
                    .then((response) => {
                         this.creator = response.data;
                    })
               })
               .catch((error) => {
                    this.eventData.title = "This event could not be found"
               });
          },
     },
     mounted() {
          this.getEventData();
     },
     components: {
       MapView
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
     width: 100vw;
     @extend .flex-column;
     justify-content: flex-start;
     padding: 15px;

     h1 {
          font-size: 10vh;
          text-align: center;
          @extend .clear;
          padding: 0px 20px;
     }

     h2 {

     }

     .tag {
          border-radius: 10px;
          height: 6vh;
          color: white;
          background-color: color(green);
          padding: 5px;
          box-sizing:border-box;
     }

     img {
          height: 30vh;
          width: 90vw;
     }

     #max {
     }
     #dates {
          span {
          }
     }
     #links {
          span {
          }
     }
     #map_container {
     }
}
</style>
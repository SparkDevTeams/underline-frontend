<template>
     <div id="event-component">
          <div id="private" v-if="!eventData.public">This event is private. Only those with this link can view. {{url}}</div>
          <h1>{{ eventData.title }}</h1>
          
          <img v-for="id in eventData.image_ids" :src="'https://sparkdev-underline.herokuapp.com/images/get?image_id=' + id"/>
          <div id="tags">
               <span class="tag" v-for="tag in eventData.tags">{{ tag }}</span>
          </div>
          
          <span id="description">{{eventData.description}}</span>

          <span>Starts at {{eventData.date_time_start}}</span>
          <span>Ends at {{eventData.date_time_end}}</span>
          <span>Created by <router-link :to="/user/ + id">user</router-link></span>
          
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
                    v-if="eventData.location.latitude"
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
               imageurl: "https://sparkdev-underline.herokuapp.com/events/get/",
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
                         method: "post",
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
     width: 100%;
     @extend .flex-column;
     justify-content: flex-start;
     padding: 15px;
     

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
          max-width:530px;
          max-height:505px;
          width: auto;
          height: auto;
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
<template>
     <div id="event-component">
          <h1>{{ title }}</h1>
          <span class="tag" v-for="tag in tags">{{ tag }}</span>
          <img />
          <h2>Located at {{ location.title }}</h2>
          <span id="max">Max capacity: {{ max_capacity }}</span>

          <div id="dates">
               <span id="date-start">{{ dateTimeStart }}</span>
               <span id="date-end">{{ dateTimeEnd }}</span>
          </div>

          <div id="links">
               <span class="link" v-for="link in links">{{ link }}</span>
          </div>

          <div id="map_container">
               <MapView
                    :pinLat="location.lat"
                    :pinLong="location.long"
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
               title: "",
               description: "",
               dateTimeStart: "",
               dateTimeEnd: "",
               tags: [],
               location: {
                    title: "",
                    lat: 0,
                    long: 0,
               },
               max_capacity: 0,
               links: [],
               creator_id: "",
          };
     },
     methods: {
          getEventData() {
               axios({
                    method: "get",
                    url:
                         "https://sparkdev-underline.herokuapp.com/get/" +
                         this.id,
               })
                    .then((response) => {
                         this.title = response.data.title;
                         this.description = response.data.description;
                         this.dateTimeStart = response.data.dateTimeStart;
                         this.dateTimeEnd = response.data.dateTimeEnd;
                         this.tags = response.data.tags;
                         this.location = response.data.location;
                         this.max_capacity = response.data.max_capacity;
                         this.links = response.data.links;
                         this.creator_id = response.data.creator_id;
                    })
                    .catch((error) => {
                         this.title = "This event could not be found"
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

     h1 {
          font-size: 10vh;
     }

     h2 {

     }

     .tag {
          border-radius: 10px;
          height: 6vh;
          color: white;
          background-color: color(green);
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
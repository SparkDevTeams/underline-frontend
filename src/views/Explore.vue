<template>
  <div>
     <div id="maps-container">
          <MapCompanion ></MapCompanion>
          <MapView></MapView>
     </div>
     <div id="event-browsers">
          <EventBrowser title="" :options="options[0]"></EventBrowser>
          <EventBrowser title="Explore tommorrow's events" :options="options[1]"></EventBrowser>
          <EventBrowser title="Explore events this week by tag" enableTags=true :options="options[2]"></EventBrowser>
          <EventBrowser title="Explore next week's events" :options="options[3]"></EventBrowser>
     </div>
     
  </div>
</template>

<script>
import axios from "axios";
import MapView from "../components/MapView.vue";
import MapCompanion from "../components/MapCompanion.vue";
import EventBrowser from "../components/EventBrowser.vue"
export default {
     data () {
          return {
               options: [
                    {
                         //intentionally left blank
                    },
                    {
                         query_date: (new Date()).setDate(new Date().getDate()+1),
                    },
                    {
                         query_date_range: {
                              start_date: new Date(),
                              end_date: (new Date()).setDate(new Date().getDate()+6)
                         },
                    },
                    {
                         query_date_range: {
                              start_date: (new Date()).setDate(new Date().getDate()+6),
                              end_date: (new Date()).setDate(new Date().getDate()+13)
                         },
                    },
               ],
          }
     },
     methods: {
  
     },
     mounted() {
  
     },
     components: {
          MapView,
          EventBrowser,
          MapCompanion
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#maps-container {
     margin-top: 4vh;
     @extend .flex-row;
     flex-wrap: wrap;
     justify-content: space-around;
     max-width: 100%;
}

#event-browsers {
     @extend .flex-column;
     justify-content: space-between;
     margin-top: 70px;
}

</style>
<template>
  <div>
     <div id="maps-container">
          <MapCompanion ></MapCompanion>
          <MapView></MapView>
     </div>
     <EventBrowser title=""></EventBrowser>
     <EventBrowser title="Explore tommorrow's events"></EventBrowser>
     <EventBrowser title="Explore events by tag"></EventBrowser>
     <EventBrowser title="Explore next week's events"></EventBrowser>
     <EventBrowser title="Explore all events"></EventBrowser>
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
     margin-top: 7vh;
     @extend .flex-row;
     flex-wrap: wrap;
     justify-content: space-around;
     max-width: 100vw;
}

</style>
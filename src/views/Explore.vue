<template>
  <div>
     <MapView></MapView>
     <SmartEvent></SmartEvent>
     <EventBrowser></EventBrowser>
  </div>
</template>

<script>
import axios from "axios";
import MapView from "../components/MapView.vue";
import SmartEvent from "../components/SmartEvent.vue";
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
          SmartEvent,
          EventBrowser
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

</style>
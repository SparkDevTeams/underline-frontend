<template>
  <div>
     <MapView></MapView>
     <SmartEvent></SmartEvent>
  </div>
</template>

<script>
import axios from "axios";
import MapView from "../components/MapView.vue";
import SmartEvent from "../components/SmartEvent.vue";
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
          SmartEvent
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

</style>
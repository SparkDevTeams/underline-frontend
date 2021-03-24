<template>
  <div id="events-component">
       <h1>Events</h1>
       <section id="ongoing-events">
            <h2>Check out these events!</h2>
       </section>
       <section id="upcoming-events">
            <h2><span>Ongoing</span> Events</h2><span></span>
       </section>
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

#events-component{
     h1{
          color: #03bf4d;
          border-top: 6px solid black;
          line-height: 50px;
          font-size: 50px;

     }
     #ongoing-events{
     }
     #upcoming-events{
     }
}


</style>
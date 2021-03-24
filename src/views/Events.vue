<template>
  <div id="events-component">
       <h1 id="title"><span>Events</span></h1>
       <section id="ongoing-events">
            <h2><span>Check</span> out these events!</h2>
            <EventDisplay></EventDisplay>
       </section>
       <section id="upcoming-events">
            <h2><span>Ongoing</span> Events</h2>
            <EventDisplay></EventDisplay>
       </section>
  </div>
</template>

<script>
import axios from "axios";
import EventDisplay from "../components/EventDisplay.vue";
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
          EventDisplay
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#events-component{
     #title{
          
     }
     span{
          color: #03bf4d;
          border-top: 6px solid black;
          line-height: 80px;
          font-size: 50px;

     }
     #ongoing-events{
     }

     #upcoming-events{
     }
}


</style>
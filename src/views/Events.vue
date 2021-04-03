<template>
  <div id="events-component">
       <h1 id="page-title">Events</h1>
       <hr class="solid">
       <section id="ongoing-events">
            <h2 id="ongoing-events-title">Check out these events!</h2>
            <EventDisplay></EventDisplay>
       </section>
       <section id="upcoming-events">
            <h2 id="upcoming-events-title">Ongoing Events</h2>
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
     @extend .clear;
     height: 48vh;
     width: 100%;

     hr.solid{
          border-top: 1px solid rgb(221, 221, 221);
          width: 80%;
     }

     #page-title{
          margin: auto;
          margin-top: 30px;
          font-size: 45px;
          border-top: 6px solid black;
          max-width: 11.50%;
          color: #03bf4d;
          text-align: center;
     }
     h2{
          color: #03bf4d;
          border-bottom: 6px solid black;
     }
     #ongoing-events{
          padding-top: 10px;
          margin-left: 20px;
          text-align: center;
          width: 23%;
     }

     #upcoming-events{
          margin-left: 20px;
          text-align: center;
          width: 15%;
          padding-bottom: 30px;
          }
}


</style>
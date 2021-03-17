<template>
  <div id = "admin-component">
       Admin
       <h2>Events for Review</h2>
       <AdminEvent v-for="event in eventList" :title ="event.title" :eventImage="event.img" :eventDescription = "event.description" :eventID = "event.id"></AdminEvent>
  </div>
</template>

<script>
import axios from "axios";
import AdminEvent from "../components/AdminEvent.vue";
export default {
     name: "Admin",
     data () {
          return {
               eventList: [{title:"Title 1", description: "description of event", img: "", id:"event ID"}]
               
  
          }
     },
     methods: {
  
     },
     mounted() {
  
     },
     components: {
          AdminEvent
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#admin-component{
     height: 20vh;
}

</style>
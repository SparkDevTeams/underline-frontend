<template>
  <div id = "admin-component">
       Admin
       <h2>Events for Review</h2>
       <AdminEvent v-for="EventTitle in EventList" :placeholderTitle ="EventTitle" :event-image="EventImage"></AdminEvent>
  </div>
</template>

<script>
import axios from "axios";
import AdminEvent from "../components/AdminEvent.vue";
export default {
     name: "Admin",
     data () {
          return {
               EventList: ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5", "Title 6"],
               EventImage:["https://www.explorebranson.com/sites/default/files/styles/hero/public,/articles/dogwood-canyon-nature-park.jpg?itok=T6-PdQKC"]
  
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
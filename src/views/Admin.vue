<template>
  <div id = "admin-component">
       Admin
       <AdminEvent></AdminEvent>
  </div>
</template>

<script>
import axios from "axios";
import AdminEvent from "../components/AdminEvent.vue";
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
          AdminEvent
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#admin-component{
     
}

</style>
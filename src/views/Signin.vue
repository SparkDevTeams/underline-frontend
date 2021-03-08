<template>
  <div id="signin-component">
       <Login></Login>
       <Signup></Signup>
  </div>
</template>

<script>
import axios from "axios";
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
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
          Signup,
          Login
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
#signin-component {
     height: 89vh;
     width: 100vw;
     @extend .flex-row;
     flex-wrap: wrap;
}

</style>
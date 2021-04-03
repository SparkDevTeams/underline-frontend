<template>
  <div id="signin-component">
       <Login v-on:signedIn="$emit('signedIn')"></Login>
       <Signup v-on:signedIn="$emit('signedIn')"></Signup>
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
     width: 100%;
     @extend .flex-row;
     flex-wrap: wrap;
}

</style>
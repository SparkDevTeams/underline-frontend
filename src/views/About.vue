<template>
  <div id="about-component">
       <h1>About Us</h1>
          <p>The Underline is a 10-mile linear park, urban trail, and public art destination below 
            Miami's Metrorail. Our mission is to fully transform the underutilized <br> land below
            Miami's Metrorail - from the Miami River to Dadeland South Station. We want the 
            Underline to become an example of repurposing <br> unused land into a public park and 
            community space and asset.
          </p>

          <p>This web application serves as a map companion that will help park-goers navigate, and give them
            information about events on the trail through our Explore <br> or Events tab. Guests will be able to create an account and make public or
            private events they can share with their family and friends.
          </p>
  </div>
</template>

<script>
import axios from "axios";
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
     }
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#about-component {
     padding: 20px;
}

h1{
     color: color(green);
     @extend .clear;
}

p{
     font-size: 15px;
     line-height: 2;
}
</style>
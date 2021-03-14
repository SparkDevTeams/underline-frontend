<template>
     <div id="profile-pic-component">
          <input type="file" accept="image/*" onchage="loadImage(event)" ref="imageSelect" style="display: none">
          <img id="icon" src="http://placehold.it/180" />
          <button @click="$refs.imageSelect.click()">Choose Photo</button>
          
          <div id="profile-info">
               <p id="name">first: {{firstName}} last: {{lastName}}</p>
               <p>Type of member: {{id}}</p>

               <div id="events-component">
                    <h3>Past Events</h3>
                    <h3>Upcoming Events</h3>
               </div>
          </div>
              
     </div>
</template>

<script>
import axios from "axios";
export default {
     data () {
          return {
               id: this.$route.params.id,
               firstName: "",
               lastName: "",
               email: ""
          }
     },
     methods: {
          getProfile(){
               var formData = {
                    user_id: this.id
               };

               axios({
                    method: "post",
                    url: "https://sparkdev-underline.herokuapp.com/users/find",
                    data: formData,
               })
               .then((response) => {
                    this.firstName=response.data.first_name;
                    this.lastName=response.data.last_name;
                    this.email=response.data.email;
               })
               .catch((error) => {
               });
          },
          loadImage(){
               var loadImage = function(event) {
               var image = document.getElementById('output');
	          image.src = URL.createObjectURL(event.target.files[0]);
               };
               }
     },
     created() {
          this.getProfile();
     },
     watch: {
          $route(to, from) {
               this.id = this.$route.params.id;
               this.getProfile();
          },
     },
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
#profile-pic-component{
     font-family: $font;
     @extend .clear;
     width: 44%;
     position: absolute;
     left: 1%;
     top: 12%;
     z-index: 401;
     padding: 2%;
     box-sizing: border-box;
     max-height: 50%;

     background: white;
     border-radius: 10px;
     @extend .shadow;
     @extend .flex-column; 
}
#icon{
     margin-left: -300px;
     width: 150px;
     height: 150px;
     border-radius: 20px;
  }
#name{
    font-size: min(5vh,60px);
    text-align: center;
    @extend .clear;
    padding: 2%;
    color: black; 
}
p {
    font-size: min(3vh,14px);
    font-weight: 300;
    text-align: center;
    color: color(grey);
  }
button {
    @extend .button;
    background-color: color(green);
    padding: 9px 14px;
    border-radius: 40px;
    font-family: $font;
    color: white;
    font-size: 16px;
    margin-top: 4%;
    margin-left: -300px;
  }



</style>
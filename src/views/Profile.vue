<template>

     <div class="container">
          <div class="user-profile-bar">
               <div class="profile-pic">
                    <img id="icon" src="http://placehold.it/180" />
               </div>
               <div class="upload-button">
                    <input type="file" accept="image/*" onchage="loadImage(event)" ref="imageSelect" style="display: none">
                    <button @click="$refs.imageSelect.click()">Choose Photo</button>
               </div>
               <div class="profile-info">
                    <p id="name">first: {{firstName}} last: {{lastName}}</p>
                    <div class="member-type">
                         <h3>Administrator</h3>
                    </div>
               </div>
               <div class="social-media">
                    <h2>Connect</h2>
                    <ul>
                         <li>Instagram</li>
                         <li>Facebook</li>
                         <li>Twitter</li>
                    </ul>
               </div>
          </div>
          <div class="events-component">
               <i class="fas fa-horizontal-rule"></i>
               <div class="upcoming-events">
                    <h2>Upcoming Events</h2>
                    <ul>
                        <li>Knitting</li> 
                    </ul>
               </div>
               <div class="past-events">
                    <h2>Past Events</h2>
                    <ul>
                         <li>Basketball Game</li>
                    </ul>
               </div>
          </div>
          <!--
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
          </div> -->
              
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
.container{
     font-family: $font;
     @extend .clear;
     width: 98%;
     height: 90%;
     position: absolute;
     left: 1%;
     top: 14%;
     z-index: 401;
     padding: 2%;
     box-sizing: border-box;
     max-height: 85%;

     background: white;
     border-radius: 10px;
     @extend .shadow;
     @extend .flex-column; 
}
.user-profile-bar{
     font-family: $font;
     //@extend .clear;
     width: 45%;
     height: 95%;
     position: absolute;
     left: 1%;
     //top: 14%;
     z-index: 402;
     padding: 2%;
     box-sizing: border-box;
     max-height: 85%;

     background: rgb(252, 251, 251);
     border-radius: 10px;
     @extend .shadow;
     @extend .flex-column; 
}
#icon{
     //position:;
     //margin-left: 20%;
     z-index: 403;
     margin-left: auto;
     margin-right:auto;
     width: 150px;
     height: 150px;
     border-radius: 100px;
  }
.profile-info{
    font-size: min(4vh,60px);
    text-align: center;
    @extend .clear;
    padding: 2%;
    color: black; 
}
.member-type{
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
     //margin-left: -440px;
     position: absolute;
     left: 38%
  }
  .events-component{
    font-family: $font;
     @extend .clear;
     width: 44%;
     height: 85%;
     position: absolute;
     margin-right: -650px;
     //top: 5%;
     z-index: 401;
     padding: 2%;
     box-sizing: border-box;
     //max-height: 100%;

     background: white;
     border-radius: 10px;
     @extend .shadow;
     @extend .flex-column; 
  }
</style>


<!--
<template>

     <div class="container">
          <div class="user-info">
               <div class="profile-pic">
                    <img id="icon" src="http://placehold.it/180" />
               </div>  
               <div class="upload-button">
                    <input type="file" accept="image/*" onchage="loadImage(input)" ref="imageSelect" style="display: none">
                    <button @click="$refs.imageSelect.click()">Choose Photo</button>
               </div>
               <div class="users-info">
                    <h1>First: {{firstName}} last:{{lastName}}</h1>
                    <div class="member-type">
                         <h3>Administrator</h3>
                    </div>
                    <div class="social-media-links">
                         <h2>Connect</h2>
                         <ul>
                              <li>Facebook</li>
                              <li>Instagram</li>
                              <li>Twitter</li>
                         </ul>
                    </div>
               </div>
          </div>


          <div class="events-logger">
               <div class="upcoming-events">
                    <h1>Upcoming Events</h1>
                    <ul>
                         <li>Book Club</li>
                    </ul>
               </div>
               <div class="previous-events">
                    <h1>Previous Events</h1>
                    <ul>
                         <li>BasketBall Game</li>
                    </ul>
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
               email: "",
               imageData: null
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
          },
          chooseImage () {
               this.$refs.fileInput.click()
               },
               
          onSelectFile () {
               const input = this.$refs.fileInput
               const files = input.files
               if (files && files[0]) {
               const reader = new FileReader
               reader.onload = e => {
                    this.imageData = e.target.result
               }
               reader.readAsDataURL(files[0])
               this.$emit('input', files[0])
      }
      
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

.user-info{
     font-family: $font;
     @extend .clear;
     width: 44%;
     position: absolute;
     left: 1%;
     top: 12%;
     z-index: 401;
     padding: 2%;
     box-sizing: border-box;
     max-height: 100%;

     background: white;
     border-radius: 10px;
     @extend .shadow;
     @extend .flex-row;      
}
.profile-pic{
     margin-top: 150px;
     margin-left: -300px;
     width: 150px;
     height: 150px;
     border-radius: 100px;
}
.member-type{
     font-size: min(3vh,14px);
     font-weight: 300;
     text-align: center;
     color: color(grey);
}
.events-logger{
     font-family: $font;
     @extend .clear;
     width: 44%;
     position: absolute;
     right: 1%;
     top: 12%;
     z-index: 401;
     padding: 2%;
     box-sizing: border-box;
     max-height: 100%;

     background: white;
     border-radius: 10px;
     @extend .shadow;
     @extend .flex-column;        
}
.upload-button{
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
/*
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
     margin-top: 150px;
     margin-left: -300px;
     width: 150px;
     height: 150px;
     border-radius: 100px;
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
*/


</style> -->

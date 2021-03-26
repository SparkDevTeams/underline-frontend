<template>
     <div id="profile-view-container"> 
          <div id="user-profile-bar">
               <div id="profile-pic">
                    <img id="icon" src="http://placehold.it/180" /> 
               </div> 
               <div id="profile-info">
                    <h1 id="name"> First: {{firstName}} Last:{{lastName}}</h1>
                    <div id="member-type">
                         <h3>Member Type</h3>
                    </div>
               </div>
               <div id="social-media">
                    <form>
                         <label for="Insta">Instagram </label>
                         <input type="text" id=" Instagram " class="form-control" value="Link your social media here!" size="21">
                         <label for="Fb"> Facebook </label>
                         <input type="text" id="Facebook" value="Link your social media here!" size="21">
                         <label for="Fb"> Twitter </label>
                         <input type="text" id="Twitter" value="Link your social media here!" size="21">
                    </form>
               </div>
          </div> 

          <div id="events-component">
               <h3 class="upcoming">Upcoming Events</h3>
               <ul>
                    <li><b> Event</b></li>
                    <div class="events-description">
                         <p>Description of Event</p>
                    </div>
               </ul>
               <h3 class="past">Past Events</h3>
               <ul>
                    <li><b> Event </b></li>
                    <div class="events-description">
                         <p>Description of Event</p>
                    </div>
               </ul>
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

#profile-view-container{
     width: 100%;

     #user-profile-bar{
          margin-top: 50px;
          height: 42%;
          #profile-pic{
               margin-left: 90px;
               margin-right: 90px;
               float: left;

               #icon{
                    border-radius: 100%;
                    width: 230px;
                    height: 230px;    
               }
          }
          #profile-info{
          }
          #social-media{
          }
     }
     #events-component{
          margin-left: 70px;
          margin-top: 50px;
     }
     /*
     #member-type{
          color:  #03bf4d;
     }
     #social-media{
          position: absolute;
          top: 150px;
     }
} 

#events-component{
     position: absolute;
     top: 320px;
     width: 95%;
     height: 300px;
     padding: 2%;
     box-sizing: border-box;
     

     background: #fcfafa;
     border-radius: 10px;
     @extend .shadow;
     @extend .flex-column; 

     .upcoming{
          position: absolute;
          top: 0px;
          left: 30px;
     }
     .past{
          position: absolute;
          top: 105px;
          left: 30px;
     }

     ul{
          list-style: none;
          width: 100%;
          clear:both;
          
     }
     h3{
          color: #03bf4d;
     }*/
     }
</style>
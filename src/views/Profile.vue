<template>
     <div id="profile-view-container"> 
          <div id="user-profile-bar">
               <div id="profile-pic">
                    <!-- <img :src="imageUrl" height="150"> -->
                    <input type="file" @change="onFilePicked">
                    <button @click="uploadFile">Upload</button> 
               </div> 
               <div id="profile-info">
                    <h1 id="name"> first: {{firstName}} last: {{lastName}}</h1>
                    <div id="member-type">
                         <h3>Member Type</h3>
                    </div>
               </div>
               <div id="social-media">
                    <form>
                         <label> Instagram </label>
                         <input type="text" name="socials[]" v-model="socials[0]" >
                         <label> Facebook </label>
                         <input type="text" name="socials[]" v-model="socials[1]" >
                         <label> Twitter </label>
                         <input type="text" name="socials[]" v-model="socials[2]" >
                    </form>
               </div>
          </div> 


          <div id="events-component">
               <h3 class="upcoming">Upcoming Events</h3>
               <ul>
                    <li><b>Event</b></li>
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
               email: "",
               socials: [],
               image_id: ""
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
          onFilePicked(event){
               this.selectedFile = event.target.files[0];
          },
          uploadFile() {
               var formData = {
                    image_id: this.image_id
               };

               axios({
                    method: 'post',
                    url: 'ttps://sparkdev-underline.herokuapp.com/image/upload',
                    data: formData
               })
               .then((response) => {
                    console.log(response);
               })
          },
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
     height: 100%;

     #user-profile-bar{
          
          border-top: 12px solid #03bf4d;
          height: 44%;
          border-bottom: 1px solid #6e6e6e;
 

          #profile-pic{
               margin-left: 90px;
               margin-right: 90px;
               margin-top: 20px;
               float: left;

               #icon{
                    border-radius: 100%;
                    margin-top: 20px;
                    //width: 230px;
                    //height: 230px;    
               }
          }
          #profile-info{
               margin-top: 30px;
               #member-type{
                    margin-top: -20px;
                    color:  #03bf4d;
                    font-size: 13px;    
               }
          }
          #social-media{
               margin-top: 40px;
               margin-left: 30px;
          }
     }
     #events-component{
          margin-left: 70px;
          margin-top: 40px;

          .upcoming, .past{
               color:#03bf4d;
          }
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
<template>
     <div id="profile-view-container"> 
          <div id="user-profile-bar">
               <div v-if="ownerOnPage" class="image">
                    <div
				v-if="imageURL"
				class="image__container"
				@click="$refs.imgUpload.click()"
                    >
                    <img :src="imageURL" class="image__preview" />
				<input
					type="file"
					ref="imgUpload"
					class="image__input"
                         style="display: none"
					@change="uploadImage"
					multiple
				/>
                    </div> 
                    <div v-if="!ownerOnPage" class="image__container-before">
                         <h1>hey whats up</h1>
			     </div>
                    <!--
                    <div v-if="!imageURL" class="image__container-before">
                         <button @click="$refs.imgUpload.click()" class="image__button-before">
                              Select Image
                         </button>
                         <input
                              type="file"
                              ref="imgUpload"
                              class="image__input-before"
                              @change="uploadImage"
                              multiple
                         />
			     </div> -->
		     </div>
		     

               <div id="profile-info">
                    <img src="https://sparkdev-underline.herokuapp.com/ user.image_id" alt="">
                    <h1 id="name"> {{user.first_name + " " + user.last_name}}</h1>
               </div>
               <div v-if="ownerOnPage" id="social-media">
                    <form>
                         <label> Instagram </label>
                         <input type="text" name="socials[]" v-model="socials[0]" @change=addLink>
                         <label> Facebook </label>
                         <input type="text" name="socials[]" v-model="socials[1]" @change=addLink>
                         <label> Twitter </label>
                         <input type="text" name="socials[]" v-model="socials[2]" @change=addLink>
                    </form>
                    <div id="submitButton">
			          <button @click="onSubmit" id="submit-btn">Submit All</button>
		           </div>
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
import jwt_decode from 'jwt-decode'
export default {
     data () {
          return {
               id: this.$route.params.id,
               ownerOnPage: false,
               user: {},
               socials: [],
               imageData: null,
			imageURL: '',
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
                    this.user=response.data;
               })
               .catch((error) => {
               });
          },
		uploadImage(e) {
			this.imageData = null
			this.imageURL = ''
			this.imageData = e.target.files
			this.imageURL = URL.createObjectURL(e.target.files[0])
		},
          checkToken(){
			let token = window.localStorage.getItem('token')
			if (token != '') {
				let userID = jwt_decode(token).user_id
                    if (userID == this.id){
                         this.ownerOnPage = true;
                    }
			}
          },
          addLink(e){
               this.socials.push(text)
          },
          onSubmit(){
               let fd = new FormData()
               fd.append('name', this.imageData[i].name)
               fd.append('file', this.imageData[i])
               axios({
                    method: 'post',
                    url: '/images/upload',
                    data: fd,
                    headers: {
                         token: this.token
                         }
                    })
                    .then(response => {
                         this.eventData.image_ids.push(response.data.image_id)
                         })
                    .catch(error => {
                         console.log(error)
                    })
               }
          },
     created() {
          this.getProfile();
          this.checkToken();
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

          .image{
               position: relative;
			border: 1px solid rgb(255, 255, 255);
               margin-top: 20px;
               margin-left: 10px;
			border-radius: 5.5px;
			width: 400px;
               height: 200px;
               float: left;
          }
 
          .image__container {
			position: relative;
			border: 1px solid black;
               margin-left: 50px;
			border-radius: 5.5px;
			cursor: pointer;
			width: 300px;

			.image__input {
				display: none;
			}

			.image__preview {
				display: block;
				width: 100%;
				border-radius: 5px;
			}
               .image__container-before{
			position: relative;
			border: 1px solid black;
               margin-left: 50px;
			border-radius: 5.5px;
			cursor: pointer;
			width: 300px;

               }
          }

          #profile-info{
               margin-top: 30px;
          }
          #social-media{
               margin-top: 40px;
               margin-left: 30px;
          }
          #submitButton{
               text-align: right;
               margin-right: 30px;
          }
     }
     #events-component{
          margin-left: 40px;
          margin-top: 30px;

          .upcoming, .past{
               color:#03bf4d;
               font-size: 23px;
          }
     }
     }
</style>
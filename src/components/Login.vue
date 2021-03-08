<template>
     <div id="login-component">
          <h1>Login</h1>

          <label>Username</label>
          <input v-model="username">

          <label>Password</label>
          <input v-model="password" type = "password">

          <button @click="login">Submit</button>
     </div>
</template>

<script>
import axios from "axios";
export default {
     data () {
          return {
               username: "",
               password: "",
          }
     },
     methods: {
          valid() {
               return true;
          },

          login() {
               if (this.valid()) {

                    var formData = {};
                    formData.username = this.username;
                    formData.password = this.password

                    axios({
                         method: "post",
                         url: "https://sparkdev-underline.herokuapp.com/users/login",
                         data: formData,
                    })
                    .then((response) => {
                    })
                    .catch((error) => {
                    });
               }
          },
     },
     mounted() {
  
     },
}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#login-component {
     @extend .shadow;
     background-color: white;
     height: min(500px,45vh);
     width: min(500px,45vw);
     border-radius: 15px;
     padding: 15px;
     box-sizing: border-box;
     @extend .flex-column;
     margin: 5vw;
}

</style>
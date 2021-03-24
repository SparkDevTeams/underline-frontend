<template>
     <div id="app">
          <NavBar :loggedIn="signedIn"></NavBar>
          <router-view v-on:signedIn="signedIn=true"></router-view>
     </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import axios from "axios";
export default {
	data() {
          return {
               signedIn: false
          };
     },
     components: {
          NavBar,
     },
     created() {
          if (window.localStorage.getItem("token")) {
			let token = window.localStorage.getItem("token");
               if (token != "") {
                    axios({
                         method: "get",
                         url:
                              "https://sparkdev-underline.herokuapp.com/auth/validate",
                         headers: {
                              "token": token,
                         },
                    })
                         .then((response) => {
						console.log(window.localStorage.getItem("token"))
					})
                         .catch((error) => {
                              window.localStorage.setItem("token", "");
                         });
               }
          } else {
               window.localStorage.setItem("token", "");
          }
     },
};
</script>

<style lang="scss">
@import "./assets/global.scss";
@import "./assets/fonts.css";

#app {
     @extend .clear;
     font-family: $font;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     height: auto;
     width: 100vw;
     @extend .flex-column;
     justify-content: flex-start;
}
</style>

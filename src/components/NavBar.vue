<template>
     <div id="nav-container">
          <img id="logo" src="../assets/grn-and-wht-u-logo.png" />
          <router-link to="/">Explore</router-link>
          <router-link to="Events">Events</router-link>
          <router-link to="About">About</router-link>
          <button id="support-button">Support</button>
          <button v-if="!signedIn" @click="login">Sign in</button>
          <button v-if="signedIn" @click="logout">Sign out</button>
     </div>
</template>

<script>
export default {
     data() {
          return {
               signedIn: false,
          };
     },
     props: ["loggedIn"],
     methods: {
          login() {
               this.$router.push("/signin");
          },
          logout() {
               window.localStorage.setItem("token", "");
               this.signedIn = false;
               this.$router.push("/signin");
          },
          checkUserSignedIn() {
               const token = window.localStorage.getItem("token");
               if (token != "") {
                    this.signedIn = true;
               }
          },
     },
     mounted() {
          this.checkUserSignedIn();
     },
     watch: {
          loggedIn: function (newVal, oldVal) {
               this.signedIn = newVal;
          },
     },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

#nav-container {
     font-family: $font;
     @extend .flex-row;
     justify-content: flex-start;
     height: 11vh;
     min-height: 11vh;
     max-height: 11vh;
     width: 100vw;
     background-color: rgb(0, 0, 0);
     padding: 0px 20px;
     box-sizing: border-box;

     #logo {
          height: 60%;
     }

     button,
     a {
          text-decoration: none;
          @extend .clear;
          font-smooth: antialiased;
          font-family: $font;
          background-color: transparent;
          font-size: 19px;
          font-weight: 600;
          color: gray;
          margin: 0px 25px;
          cursor: pointer;

          &:hover {
               color: rgb(255, 255, 255);
          }
     }

     #support-button {
          margin-left: auto;
     }
}
</style>

<template>
  <div id="nav-container">
    <img id="logo" src="../assets/logo.png">
    <button>Explore</button>
    <button>Events</button>
    <button @click="changeHeader">About</button>
    <button id="support-button">Support</button>
    <button>Donate</button>
    <h1>{{header}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: "collin"
    };
  },
  methods: {
    changeHeader() {
      this.header = "header"
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#nav-container {
  @extend .flex-row;
  justify-content: flex-start;
  height: 11vh;
  width: 100vw;
  background-color: rgb(34, 34, 34);
  padding: 0px 20px;
  box-sizing: border-box;

  #logo {
    height: 60%;
  }

  button {
    @extend .clear;
    background-color: transparent;
    font-size: 16px;
    font-weight: 700;
    color:gray;
    margin: 0px 25px;
    cursor: pointer;

    &:hover {
      color:rgb(255, 255, 255);
    }

  }

  #support-button {
    margin-left:auto;
  }
}



</style>
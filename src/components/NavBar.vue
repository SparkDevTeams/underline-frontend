<template>
  <div id="nav-container">
    <img id="logo" src="../assets/grn-and-wht-u-logo.png">
    <button>Explore</button>
    <button>Events</button>
    <button>About</button>
    <button id="support-button">Support</button>
    <button>Donate</button>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#nav-container {
  font-family: inherit;
  @extend .flex-row;
  justify-content: flex-start;
  height: 11vh;
  width: 100vw;
  background-color: rgb(0, 0, 0);
  padding: 0px 20px;
  box-sizing: border-box;

  #logo {
    height: 60%;
  }

  button {
    @extend .clear;
    font-smooth: antialiased;
    font-family: inherit;
    background-color: transparent;
    font-size: 19px;
    font-weight: 600;
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
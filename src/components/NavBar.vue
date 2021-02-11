<template>
  <div id="nav-container">
    <button>Event List</button>
    <img src="../assets/logo.png">
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
#nav-container {

  position: absolute;
  top: 0;
  width: 100%;
  height: 7vh;
  @extend .flex-row;
  justify-content: flex-end;

  // z index of leaflet is 400 by default
  z-index: 401;
  
  img {
    height: 80%;
    margin-right: 8px;
    cursor: pointer;
  }
  button {
    margin-right: 5vw;
  }
}
</style>
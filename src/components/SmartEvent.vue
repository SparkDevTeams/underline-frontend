<template>
  <div id="smart-event-container">
    <p>I want to have a</p>
    <input>
    <p> on </p>
    <input>
    <p> in </p>
    <input>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
#smart-event-container{
  @extend .shadow;
  margin-top: 2vh;
  height: 15vh;
  width: 96vw;
  background-color: black;
  border-radius: 0px 0px 10px 10px;
  @extend .flex-row;

  p {
    color: white;

  }
}
</style>
<template>
  <div id="map-companion-container">
    <h1>Create Your </h1>
    <h1 id="community">Community</h1>
    <p>Create events, invite friends and share with the community. Whether its in person, at the park, or virtually - your community should serve you!</p>
    <p>Connect with others that share the same interests and hobbies , and find activities and resources to get involved in!</p>
    <button>LEARN MORE</button>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

#map-companion-container {
  font-family: $font;
  @extend .clear;
  width: 30%;
  position: absolute;
  right: 1vw;
  top: 4vw;
  z-index: 401;
  padding: 2%;
  box-sizing: border-box;

  background: white;
  border-radius: 10px;
  @extend .shadow;
  @extend .flex-column;

  h1 {
    font-size: 60px;
    text-align: center;
    @extend .clear;
  }
  #community {
    color: color(green)
  }
  p {
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    color: color(grey);
  }
  button {
    @extend .button;
    background-color: color(green);
    padding: 10px 15px;
    border-radius: 40px;
    font-family: $font;
    color: white;
    font-size: 16px;
    margin-top: 20px;
  }
}
</style>
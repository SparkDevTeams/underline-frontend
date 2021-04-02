<template>
  <div id="map-companion-container">
    <h1>Welcome to <br>The <span id="community">Underline</span></h1> 
    <p>This tool from The Underline allows you and the Miami community to host and share events. Connect with others that share the same interests and hobbies , and find activities to get involved in!</p>
    <p>Interested in learning more about the Underline? Click <a href="https://www.theunderline.org/">Here</a> to visit the main site. Interested in creating an event? Click the button below.</p>
    <button>Create An Event</button>
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
  min-width: 300px;
  padding: 2%;
  box-sizing: border-box;
  height: 60vh;
  margin: 15px;

  background: white;
  border-radius: 10px;
  @extend .shadow;
  @extend .flex-column;
  justify-content: space-around;

  h1 {
    font-size: max(5vmin,35px);
    text-align: center;
    @extend .clear;
  }
  #community {
    color: color(green)
  }
  p {
    font-size: 20px;
    font-weight: 100;
    text-align: center;
    color: (rgb(39, 32, 32));
    @extend .clear;
  }
  button {
    @extend .button;
    background-color: color(green);
    padding: 13px 18px;
    border-radius: 40px;
    font-family: $font;
    color: white;
    font-size: 20px;
    margin-top: 1vh;
  }
}

@media screen and (max-width:1000px) {
  #map-companion-container { flex-basis: 90%  }
}
</style>
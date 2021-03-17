<template>
  <div id="event-display-container">
      <img :src = "eventImage">
      <h1>{{title}}</h1>
      <p>{{eventDescription}}</p>
  </div>
</template>

<script>
export default {
  name: "EventDisplay",
  props: [
      "title",
      "eventImage",
      "eventDescription",
      "eventID"
  ],
  data() {
    return {
    };
  },
  methods: {},
  created() {},
  watch: {},
  components: {
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

#event-display-container {
  font-family: $font;
  @extend .clear;
  width: 240px;
  height: 90%;
  z-index: 401;
  padding: 2%;
  box-sizing: border-box;

  background: white;
  border-radius: 10px;
  @extend .shadow;
  @extend .flex-column;

  h1 {
    color:color(green);
    font-size: 40px;
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

  img{
    width: 200px;
    height: 200px;
    border-radius: 15px;
  }
}
</style>
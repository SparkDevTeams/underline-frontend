<template>
  <div id="event-display-container">
      <h1>{{title}}</h1>
      <p>Description of Event</p>
  </div>
</template>

<script>
export default {
  name: "EventDisplay",
  props: [
      "title"
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
  width: 30%;
  height: 90%;
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
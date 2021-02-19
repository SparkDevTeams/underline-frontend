<template>
  <div id="map-companion-container">
    <h1>The Underline</h1>
    <button>List all events</button>
    <button>Create an event</button>
  </div>
</template>

<script>
var $ = require( "jquery" );
import jqueryui from "jqueryui"
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    $('#map-companion-container').draggable();
  },
  watch: {},
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

#map-companion-container {
  font-family: $font;
  @extend .clear;
  height: 94%;
  width: 30%;
  position: absolute;
  right: 1vw;
  top: 1vw;
  z-index: 401;

  background: white;
  border-radius: 10px;
  @extend .shadow
}
</style>
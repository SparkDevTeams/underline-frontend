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
#map-companion-container {
  @extend .clear;
  height: 70vh;
  width: 30vw;
  position: absolute;
  right: 15vw;
  z-index: 401;

  background: white;
  border-radius: 10px;
  @extend .shadow
}
</style>
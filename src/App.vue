<template>
  <div id="app">
    <NavBar></NavBar>
    <MapView></MapView>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import MapView from "./components/MapView.vue";
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  created() {},
  watch: {},
  components: {
    NavBar,
    MapView
  },
};
</script>

<style lang="scss">
@import "./assets/global.scss";
@import "./assets/fonts.css";

#app {
  @extend .clear;
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  @extend .flex-column;
  justify-content: flex-start;
}
</style>

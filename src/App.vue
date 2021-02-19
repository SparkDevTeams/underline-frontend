<template>
  <div id="app">
    <NavBar></NavBar>
    <MapView></MapView>
    <MapCompanion></MapCompanion>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import MapView from "./components/MapView.vue";
import MapCompanion from "./components/MapCompanion.vue";
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
    MapView,
    MapCompanion
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/global.scss";

#app {
  @extend .clear;
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  @extend .flex-column
}
</style>

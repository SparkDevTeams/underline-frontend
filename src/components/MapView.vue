<template>
  <div id="map-container">
    <div id="underline-map">
      <MapCompanion></MapCompanion>
    </div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import MapCompanion from "./MapCompanion.vue"
export default {
  data() {
    return {
      map: null,
      areas: [],
    };
  },
  methods: {
    initializeMap() {
      var northEastBounds = L.latLng(24, -82);
      var southWestBounds = L.latLng(27, -79);
      var bounds = L.latLngBounds(northEastBounds, southWestBounds);

      this.map = new L.map("underline-map").setView([25.7644, -80.1935], 18);
      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
          minZoom: 15,
        }
      ).addTo(this.map);

      L.polygon(
        [
          [25.766334, -80.195716],
          [25.76635, -80.19531],
          [25.7625, -80.1952],
          [25.7625, -80.1955],
        ],
        { color: "#3cb44c", stroke: false }
      ).addTo(this.map);

      this.map.setMaxBounds([
        [25.773, -80.210],
        [25.753, -80.180],
      ]);
    },
  },
  mounted() {
    this.initializeMap();
  },
  watch: {},
  components: {
    MapCompanion
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
#map-container {
  height: 80vh;
  width: 96vw;
}
#underline-map {
  height: 100%;
  margin-top: 0px;
  border-radius: 15px;
  margin:2vw 0;
}
</style>
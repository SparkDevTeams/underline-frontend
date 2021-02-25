<template>
    <div id = "event-browser-container">
        <h2>Explore more free activities and events in your community</h2>
        <EventDisplay v-for = "EventTitle in EventList" :title  = "EventTitle"></EventDisplay>
    </div>
        
</template>

<script>
import EventDisplay from './EventDisplay.vue';
export default {
  name: "EventBrowser",
  data() {
    return {
        EventList: ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"]
    };
  },
  methods: {},
  created() {},
  watch: {},
  components: {
      EventDisplay
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

#event-browser-container {
  font-family: $font;
  @extend .clear;
  height: 64vh;
  width: 96vw;
  right: 1vw;
  top: 4vw;
  z-index: 401;
  padding: 2%;
  box-sizing: border-box;

  background: white;
  border-radius: 10px;
  @extend .shadow;
  @extend .flex-row;

  h2 {
    font-size: 60px;
    text-align: center;
    @extend .clear;
  }
  
}
</style>
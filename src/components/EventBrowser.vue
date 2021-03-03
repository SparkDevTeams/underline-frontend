<template>
    <div id = "event-browser-component">
        <h3>Explore more free activities and events in your community</h3>
        <div id = "event-browser-container">
          <EventDisplay v-for = "EventTitle in EventList" :title  = "EventTitle" :placeholderImg="EventImage"></EventDisplay>
        </div>
    </div>
        
</template>

<script>
import EventDisplay from './EventDisplay.vue';
export default {
  name: "EventBrowser",
  data() {
    return {
        EventList: ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"],
        EventImage: ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"]
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

#event-browser-component {
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
  @extend .flex-column;

  h3 {
    font-size: 30px;
    margin-right: auto;
    @extend .clear;
  }

  #event-browser-container{
    @extend .flex-row;
  }
}
</style>
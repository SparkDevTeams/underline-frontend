<template>
    <div id="event-browser-component">
        <h3>Explore more free activities and events in your community</h3>

        <div id="event-browser-container">
          <EventDisplay v-for="event in eventList" :title="event.title" :eventImage="event.img" :eventDescription = "event.description" :eventID = "event.id"></EventDisplay>
        </div>
    </div>
        
</template>

<script>
import EventDisplay from './EventDisplay.vue';
export default {
  name: "EventBrowser",
  data() {
    return {
        eventList: [{title:"Title 1", description: "description of event", img: "", id:"event ID"}],
        
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
  height: 48vh;
  width: 100%;
  margin-top: 4vw;
  box-sizing: border-box;
  @extend .flex-column;

  h3 {
    font-size: 30px;
    @extend .clear;
    text-align: center;
    margin-bottom: 1vw;
  }

  #event-browser-container{
    @extend .flex-row;
    justify-content: space-around;
    width: 100%;
  }
}
</style>
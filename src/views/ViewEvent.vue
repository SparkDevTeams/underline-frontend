<template>
  <div id="view-event">
    <div id="first">
      <h1>context</h1>
    </div>
    <div id="second">
      <h1>context</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {},
  mounted() {},
  components: {},
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#view-event{
  @extend .flex-row;
}
#first { //wraps entirety of page since two main divs arent allowed
  border: 5px solid red;
  background: purple;;
}

#second{ 
  background: blue;
}


</style>
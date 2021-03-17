<template>
  <div>edit event test</div>
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
</style>
<template>
  <div id="view-event">
    <div id="event-display-card">
      <div id="image-container"> 
        <h1>Image</h1>
      </div>
      <div id="event-details"> 
        <h1 id="display-card-title">Event Title</h1>
        <ul class="event-details-list">
          <li>Date</li>
          <li>Time</li>
          <li>Location</li>
          <li>Organization</li>
        </ul> 
        <button>Register</button>
      </div>
    </div>
    <div id="event-info-box">
      <div id="event-description">
        <h1 class="title">Event Title</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur 
          voluptatem sapiente similique nobis sint veritatis perferendis, corrupti 
          blanditiis possimus deleniti fuga dolore reprehenderit dolores architecto 
          beatae, labore necessitatibus, laboriosam totam.
        </p>
        <h2><b>Share</b></h2>
      </div>
      <div id="similar-events">
        <h1 class="title">Similar Events</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur 
          voluptatem sapiente similique nobis sint veritatis perferendis, corrupti 
          blanditiis possimus deleniti fuga dolore reprehenderit dolores architecto 
          beatae, labore necessitatibus, laboriosam totam.
        </p>
      </div>
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

#event-display-card{
  display: flex;
  justify-content: center;
  text-align: left;
}
#image-container, #event-details{
  margin-top: 40px;
  @extend .shadow;
}
ul{
  list-style-type: none;
  justify-content: flex-start;
  margin-top: 40px;
  font-size: 2vh;
}
#image-container{
  background: blueviolet;
  display: table-cell; 
  width: 106vh;
  vertical-align: middle;
}
#event-details{
  background: #03bf4d;
  color: white;
  border-bottom: 10vh solid black;
  width: 60vh;
  height: 35vh;
  display: table-cell;
  text-align: center;

  #display-card-title{
    font-size: min(5vh,60px);
  }
  ul{
    text-align: left;
  }
  h1{
    text-align: center;
  }

  button {
    @extend .button;
    background-color: color(green);
    padding: 10px 15px;
    border-radius: 40px;
    font-family: $font;
    color: white;
    font-size: 25px;
    width: 40%;
    margin-top: 63px;
    
  }
}
#event-info-box{
  display: flex;
  @extend .shadow;
	background-color: rgb(255, 255, 255);
	height: auto;
	width: 165vh;
	border-radius: 15px;
	padding: 15px;
	box-sizing: border-box;
  margin-top: 20px;

   p{
    font-size: min(2vh, 30px);
    color: #6e6e6e;
  }
}
#event-description{
  height: auto;
	width: min(800px, 70vw);
  margin-left: 30px;
  margin-right: 30px;

  h2{
    color:  #6e6e6e
    //font-weight normal;
  }
}
#similar-events{
  height: auto;
	width: min(500px, 45vw);
  margin-left: 40vh;
  margin-right: 30px;

}
.title{
  color: #03bf4d;
  font-size: min(5vh,60px);
}


</style>
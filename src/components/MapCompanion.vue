<template>
    <div id="map-companion-container">
        <h1>Welcome to <br />The <span id="community">Underline</span></h1>
        <p>
            This tool allows you and your community to host and share events.
            Connect with others that share the same interests, and find
            activities to get involved in.
        </p>
        <p>
            Interested in learning more about the Underline? Click
            <a href="https://www.theunderline.org/">Here</a> to visit the main
            site. Interested in creating an event? Click the button below.
        </p>
        <button @click="route">Create An Event</button>
    </div>
</template>

<script>
import router from "../router";
export default {
    methods: {
        route() {
            if (window.localStorage.getItem("token") != "") {
                router.push({
                    path: "/event/create"
                });
            } else {
              router.push({
                    path: "/signin"
                });
            }
        },
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

#map-companion-container {
    font-family: $font;
    @extend .clear;
    width: 34%;
    min-width: 300px;
    padding: 2%;
    box-sizing: border-box;
    height: 60vh;

    background: white;
    border-radius: 10px;
    @extend .flex-column;
    justify-content: space-around;

    h1 {
        font-size: max(5vmin, 35px);
        text-align: center;
        @extend .clear;
        color: color(green);
    }

    p {
        font-size: 20px;
        font-weight: 100;
        text-align: center;
        color: color(grey);
        @extend .clear;
        max-width: 90vw;
    }
    button {
        @extend .button;
        background-color: color(green);
        padding: 13px 18px;
        border-radius: 40px;
        font-family: $font;
        color: white;
        font-size: 20px;
        margin-top: 1vh;
    }
}

@media screen and (max-width: 1000px) {
    #map-companion-container {
        flex-basis: 90%;
    }
}
</style>
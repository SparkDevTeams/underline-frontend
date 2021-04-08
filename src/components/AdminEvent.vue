<template>
    <div id="admin-event-component">
        <img :src="eventImage" />
        <h2>{{ title }}</h2>
        <p>{{ eventDescription }}</p>
        <button id="remove-button" @click="acceptEvent(false)">Remove</button>
        <button id="accept-button" @click="acceptEvent(true)">Accept</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "AdminEvent",
    props: ["title", "eventImage", "eventDescription", "eventID"],

    data() {
        return {};
    },
    methods: {
        async acceptEvent(arg) {
            await axios({
                method: "get",
                url: "/admin/decide_event",
                headers: {
                    token: window.localStorage.getItem("token"),
                },
                params: {
                    approve_bool: arg,
                    event_id: this.eventID,
                },
            })
                .then((response) => {
                    this.events = response.data.events;
                })
                .catch((e) => {});
        },
    },
    mounted() {},
    components: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#admin-event-component {
    font-family: $font;
    @extend .clear;
    width: 1000px;
    height: 8vh;
    min-height: 120px;
    z-index: 401;
    padding: 2%;
    box-sizing: border-box;
    margin-top: 10px;

    background: white;
    border-radius: 10px;
    @extend .shadow;
    @extend .flex-row;

    h2 {
        color: color(green);
        font-size: 20px;
        margin-right: auto;
        @extend .clear;
        width: 150px;
    }

    p {
        font-size: 17px;
        font-weight: 250;
        margin-right: auto;
        max-width: 60%;
    }
    #accept-button {
        @extend .button;
        padding: 8px 15px;
        border-radius: 5px;
        border-style: solid;
        font-family: $font;
        color: green;
        font-size: 15px;
        margin-top: 15px;
        margin-left: 15px;
    }

    #remove-button {
        @extend .button;
        padding: 8px 15px;
        border-radius: 5px;
        color: grey;
        font-size: 15px;
        margin-top: 15px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 15px;
        margin-right: auto;
    }
}
</style>
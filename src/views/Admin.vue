<template>
    <div id="admin-component">
        Admin
        <h2>Events for Review</h2>
        <AdminEvent
            v-for="event in events"
            :title="event.title"
            :eventImage="event.img"
            :eventDescription="event.description"
            :eventID="event.event_id"
            :key="event.event_id"
        ></AdminEvent>
    </div>
</template>

<script>
import axios from "axios";
import AdminEvent from "../components/AdminEvent.vue";
export default {
    name: "Admin",
    data() {
        return {
            events: [],
        };
    },
    methods: {
        async getEvents() {
            await axios({
                method: "get",
                url: "/admin/events_queue",
                headers: {
                    token: window.localStorage.getItem("token"),
                },
            })
                .then((response) => {
                    this.events = response.data.events;
                })
                .catch((e) => {});
        },
    },
    mounted() {
        this.getEvents();
    },
    components: {
        AdminEvent,
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";

#admin-component {
    height: 20vh;
}
</style>

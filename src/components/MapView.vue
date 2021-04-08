<template>
    <div id="map-container">
        <h1>Explore today's events</h1>
        <div id="underline-map"></div>
    </div>
</template>

<script>
import leaflet from "leaflet";
import router from "../router/";
import axios from "axios";
import MapCompanion from "./MapCompanion.vue";
export default {
    data() {
        return {
            map: null,
            events: [],
            pins: [],
        };
    },
    props: {
        pinLat: null,
        pinLong: null,
    },
    methods: {
        initializeMap() {
            var northEastBounds = L.latLng(24, -82);
            var southWestBounds = L.latLng(27, -79);
            var bounds = L.latLngBounds(northEastBounds, southWestBounds);

            if (this.pinLat != null) {
                this.map = new L.map("underline-map").setView(
                    [this.pinLat, this.pinLong],
                    17
                );
                var marker = L.marker([this.pinLat, this.pinLong]).addTo(
                    this.map
                );
            } else {
                this.map = new L.map("underline-map").setView(
                    [25.764368, -80.195448],
                    17
                );
            }
            this.map.attributionControl.setPrefix(false);
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
                [25.773, -80.21],
                [25.753, -80.18],
            ]);
        },
        getEvents() {
            axios({
                method: "post",
                url: "/events/find/batch",
                data: {
                    limit: 30,
                },
            })
                .then((response) => {
                    this.events = response.data.events;
                    this.renderEvents();
                })
                .catch((e) => {});
        },
        renderEvents() {
            this.pins = [];
            for (var event of this.events) {
                this.createPin(
                    event.location.latitude,
                    event.location.longitude,
                    event.location.title,
                    event.title,
                    event.event_id
                );
            }
        },
        createPin(latitude, longitude, location, title, eventID) {
            var marker = L.marker([latitude, longitude]).addTo(this.map);
            marker.bindPopup(
                "<b>" +
                    title +
                    "</b><br>Located at " +
                    location +
                    "<br><br><a href='#/event/" +
                    eventID +
                    "'>Click here for event details</a><br>"
            );
            this.pins.push(marker);
        },
    },
    mounted() {
        this.initializeMap();
        if (this.pinLat == null) {
            this.getEvents();
        }
    },
    watch: {},
    components: {
        MapCompanion,
    },
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
#map-container {
    height: 60vh;
    width: max(54vw, 380px);
    min-width: 300px;
    max-width: 90vw;
    h1 {
        @extend .clear;
        font-size: max(5vmin, 35px);
        margin-bottom: 5vh;
        text-align: center;
        width: 100%;
        color: color(green);
    }
}

#underline-map {
    height: 52.8vh;
    margin-top: 0px;
    border-radius: 15px;
    @extend .shadow;
}

@media screen and (max-width: 1000px) {
    #map-container {
        flex-basis: 90%;
    }
}
</style>
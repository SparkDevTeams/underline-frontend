<template>
    <div id="event-display-container" @click="route">
        <img :src="eventImage" />
        <h1>{{ title }}</h1>
        <div id="tags-container">
            <div
                v-for="tag in tags.slice(0, 2)"
                @click="tag.active = !tag.active"
                :class="{ active: tag.active }"
                :key="tag.id"
            >
                {{ tag }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EventDisplay",
    props: ["title", "eventImage", "tags", "id"],
    data() {
        return {};
    },
    methods: {
        route(){
            this.$router.push({
                path:"/event/" + this.id
            })
        }
    },
    created() {},
    watch: {},
    components: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

#event-display-container {
    font-family: $font;
    @extend .clear;
    width: 240px;
    height: 90%;
    padding: 6px;
    box-sizing: border-box;
    height: 240px;
    background: white;
    border-radius: 10px;
    @extend .shadow;
    @extend .flex-column;
    justify-content: flex-start;
    transform: (scale(1.0));
    transition: transform 0.07s;
    transition-timing-function: ease-out;

    &:hover {
        cursor: pointer;
        transform: (scale(1.1));
        transition: transform 0.07s;
        transition-timing-function: ease-out;
    }

    h1 {
        color: black;
        font-size: 20px;
        width: 100%;
        text-align: center;
        @extend .clear;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    #community {
        color: color(green);
    }
    p {
        font-size: 20px;
        font-weight: 300;
        text-align: center;
    }
    button {
        @extend .button;
        background-color: color(green);
        padding: 10px 15px;
        border-radius: 40px;
        font-family: $font;
        color: white;
        font-size: 16px;
        margin-top: 20px;
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 15px;
    }

    #tags-container {
        @extend .flex-row;
        flex-wrap: wrap;
        

        > div {
            user-select: none;
            margin: 10px;
            background-color: color(green);
            color: white;
            padding: 5px 15px;
            border-radius: 30px;
            font-size: 12px;
        }

    }
}
</style>
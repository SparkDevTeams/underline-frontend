<template>
    <div id="event-display-container" class="intro" @click="route">
        <img :src="'https://sparkdev-underline.herokuapp.com/images/get?image_id=' + imageID" />
        <h1>{{ title }}</h1>
        <div id="tags-container">
            <div
                v-for="tag in newtags.slice(0, 1)"
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
    props: ["title", "imageID", "tags", "id"],
    data() {
        return {
            image: "/images/get?image_id=" + this.imageID,
            newtags: [],
        };
    },
    methods: {
        route() {
            this.$router.push({
                path: "/event/" + this.id,
            });
        },
        improveTags(){
            for (const tag of this.tags.values()) {
                let newtag = tag.substr(0,(tag.indexOf('_')));
                newtag = newtag.charAt(0).toUpperCase() + newtag.slice(1);
                this.newtags.push(newtag);
            }
        }
    },
    created() {
        this.improveTags();
    },
    watch: {},
    components: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/global.scss";
@import "../assets/fonts.css";

.intro {
    -webkit-animation: fadeIn 1s forwards;
    animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateX(40%);
    }
    100% {
        opacity: 1;
        transform: translateX(0%);
    }
}

#event-display-container {
    font-family: $font;
    @extend .clear;
    width: 240px;
    height: 90%;
    padding: 21px;
    box-sizing: border-box;
    height: 240px;
    background: white;
    border-radius: 10px;
    @extend .shadow;
    @extend .flex-column;
    justify-content: space-between;
    transform: (scale(1));
    transition: all 0.07s;
    transition-timing-function: ease-out;
    opacity: 1;

    &:hover {
        cursor: pointer;

        -webkit-filter: drop-shadow(0px 0px 10px rgba(156, 156, 156, 0.9));
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
        width: 170px;
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
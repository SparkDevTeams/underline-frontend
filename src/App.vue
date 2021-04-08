<template>
    <div id="app">
        <div id="nav-container" v-if="windowSize.width <= 700">
            <Slide width="200" :closeOnNavigation="true" noOverlay>
                <img id="logo" src="./assets/grn-and-wht-u-logo.png" />
                <router-link class="menu-item" to="/">Explore</router-link>
                <router-link class="menu-item" to="About">About</router-link>
                <a
                    class="menu-item"
                    href="https://www.theunderline.org/support/"
                    id="support-button"
                    >Support</a
                >
                <router-link
                    class="menu-item"
                    v-if="isAdmin"
                    id="admin-portal"
                    to="admin"
                    >Admin Portal</router-link
                >
                <router-link
                    class="menu-item"
                    v-if="signedIn"
                    id="profile-page"
                    :to="'/user/' + id"
                    >Profile Page</router-link
                >

                <button id="signout-btn" v-if="!signedIn">Sign in</button>
                <button id="signin-btn" v-if="signedIn" @click="logout">
                    Sign out
                </button>
            </Slide>
        </div>

        <NavBar v-if="windowSize.width > 700" :loggedIn="signedIn"></NavBar>
        <router-view v-on:signedIn="signedIn = true"></router-view>
    </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { Slide } from "vue-burger-menu";
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            signedIn: false,
            windowSize: {
                width: 0,
                height: 0,
            },
            id: "",
            isAdmin: false,
        };
    },
    components: {
        NavBar,
        Slide,
    },
    created() {
        if (window.localStorage.getItem("token")) {
            let token = window.localStorage.getItem("token");
            if (token != "") {
                axios({
                    method: "get",
                    url: "/auth/validate",
                    headers: {
                        token: token,
                    },
                })
                    .then((response) => {
                        //console.log(window.localStorage.getItem("token"))
                    })
                    .catch((error) => {
                        window.localStorage.setItem("token", "");
                    });
            }
        } else {
            window.localStorage.setItem("token", "");
        }
        //checks window size on created
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
    destroyed() {
        //Cleanup
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize() {
            this.windowSize.width = window.innerWidth;
            this.windowSize.height = window.innerHeight;
        },
        checkUserSignedIn() {
            const token = window.localStorage.getItem("token");
            if (token != "") {
                this.id = jwt_decode(token).user_id;
                this.signedIn = true;
                this.checkUserAdmin();
            }
        },
        login() {
            this.$router.push("/signin");
        },
        logout() {
            window.localStorage.setItem("token", "");
            this.signedIn = false;
            this.$router.push("/signin");
        },
        checkUserAdmin() {
            axios({
                method: "post",
                url: "/users/find",
                data: {
                    user_id: this.id,
                },
            })
                .then((response) => {
                    if (response.data.user_type == "ADMIN") {
                        this.isAdmin = true;
                    }
                })
                .catch((error) => {});
        },
    },
    mounted() {
        this.checkUserSignedIn();
    },
    watch: {
        loggedIn: function (newVal, oldVal) {
            this.signedIn = newVal;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "./assets/global.scss";
@import "./assets/fonts.css";

#app {
    @extend .clear;
    font-family: $font;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: auto;
    width: 100%;
    max-width: 100%;
    @extend .flex-column;
    justify-content: flex-start;

    #nav-container {
        font-family: $font;
        @extend .flex-row;
        justify-content: flex-start;
        height: 11vh;
        min-height: 11vh;
        max-height: 11vh;
        width: 100%;
        max-width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;

        #logo {
            height: 100px;
        }

        button {
            @extend .button;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 40px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10%;
            color: white;
            font-size: 18px;
            letter-spacing: 2px;
            font-weight: bold;
            text-align: center;
        }

        button#signin-btn {
            background: rgba(255, 0, 0, 0.8);
        }

        button#signout-btn {
            background: color(green);
        }

        .menu-item {
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .menu-item:hover {
            color: color(green);
        }
    }
}
</style>

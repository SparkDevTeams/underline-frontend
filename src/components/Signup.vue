<template>
    <div id="signup-component">
        <h1>Signup</h1>
        <div class="error-message-container" v-if="errorMessages.length > 0">
            <p>The following errors occurred:</p>
            <ul>
                <li v-for="(message, index) in errorMessages" :key="index">
                    {{ message }}
                </li>
            </ul>
        </div>
        <label>First Name</label>
        <input
            v-model="signUpData.firstName"
            @change="validateName(signUpData.firstName, 'first')"
            :class="{ error: errors.firstName }"
            @keypress.13.prevent="signup"
        />

        <label>Last Name</label>
        <input
            v-model="signUpData.lastName"
            @change="validateName(signUpData.lastName, 'last')"
            :class="{ error: errors.lastName }"
            @keypress.13.prevent="signup"
        />

        <label>Email</label>
        <input
            v-model="signUpData.email"
            @change="validateEmail"
            :class="{ error: errors.email }"
            @keypress.13.prevent="signup"
        />

        <label>Password</label>
        <input
            v-model="signUpData.password"
            type="password"
            @change="validatePassword"
            :class="{ error: errors.password }"
            @keypress.13.prevent="signup"
        />

        <label>Confirm Password</label>
        <input
            v-model="signUpData.confirmPassword"
            type="password"
            @change="validatePasswordsAreSame"
            :class="{ error: errors.confirmPassword }"
            @keypress.13.prevent="signup"
        />

        <button @click="signup">Submit</button>
    </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import jwt_decode from "jwt-decode";
export default {
    data() {
        return {
            signUpData: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            errors: {
                firstName: false,
                lastName: false,
                email: false,
                password: false,
                confirmPassword: false,
            },
            hasError: false,
            errorMessages: [],
        };
    },
    methods: {
        validateName(name, nameData) {
            let insufficientLettersError = `${this.capitalize(
                nameData
            )} name must be between 2 to 36 characters`;
            let nonLetterError = `Please check your ${nameData} name does not contain numbers.`;
            //Checks if user's first/last name is within 2 - 36 char long
            if (name.length >= 2 && name.length <= 36) {
                //Removes error message from array
                this.errorMessages = this.errorMessages.filter(
                    (msg) => msg !== insufficientLettersError
                );

                //Checks if text field contains invalid characters
                if (!name.match(/^[a-zA-Z]+$/)) {
                    if (!this.errorMessages.includes(nonLetterError)) {
                        this.errorMessages.push(nonLetterError);
                    }
                    if (nameData == "first") {
                        this.errors.firstName = true;
                    }
                    if (nameData == "last") {
                        this.errors.lastName = true;
                    }
                } else {
                    //Removes error message from array
                    this.errorMessages = this.errorMessages.filter(
                        (msg) => msg !== nonLetterError
                    );
                    if (nameData == "first") {
                        this.errors.firstName = false;
                    }
                    if (nameData == "last") {
                        this.errors.lastName = false;
                    }
                }
            } else {
                if (!this.errorMessages.includes(insufficientLettersError)) {
                    this.errorMessages.push(insufficientLettersError);
                }
                if (nameData == "first") {
                    this.errors.firstName = true;
                }
                if (nameData == "last") {
                    this.errors.lastName = true;
                }
            }
        },
        validateEmail() {
            let errorMessage = "Please provide valid email.";
            //Checks email format is correct.
            if (!this.signUpData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                if (!this.errorMessages.includes(errorMessage)) {
                    this.errorMessages.push(errorMessage);
                }

                this.errors.email = true;
            } else {
                this.errorMessages = this.errorMessages.filter(
                    (msg) => msg !== errorMessage
                );
                this.errors.email = false;
            }
        },
        validatePassword() {
            let errorMessage =
                "Please make sure your password is between 6 to 15 characters long.";
            if (
                this.signUpData.password.length >= 6 &&
                this.signUpData.password.length <= 15
            ) {
                this.errorMessages = this.errorMessages.filter(
                    (msg) => msg !== errorMessage
                );
                this.errors.password = false;
            } else {
                if (!this.errorMessages.includes(errorMessage)) {
                    this.errorMessages.push(errorMessage);
                }
                this.errors.password = true;
            }
        },
        validatePasswordsAreSame() {
            let errorMessage = "Please check your passwords match";
            //Checks if passwords match
            if (this.signUpData.password !== this.signUpData.confirmPassword) {
                if (!this.errorMessages.includes(errorMessage)) {
                    this.errorMessages.push(errorMessage);
                }

                this.errors.confirmPassword = true;
            } else {
                this.errorMessages = this.errorMessages.filter(
                    (msg) => msg !== errorMessage
                );
                this.errors.confirmPassword = false;
            }
        },
        validate() {
            let errorMessage = "Please make sure no text field is left blank";
            //Checks if inputs are empty
            for (const key in this.signUpData) {
                if (this.signUpData[key] == "") {
                    if (!this.errorMessages.includes(errorMessage)) {
                        this.errorMessages.push(errorMessage);
                    }
                    this.errors[key] = true;
                } else {
                    this.errorMessages = this.errorMessages.filter(
                        (msg) => msg !== errorMessage
                    );
                    this.errors[key] = false;
                }
            }
            //Loops through errors obj
            for (const key in this.errors) {
                //checks if key in obj is true & if it is sets hasError to true
                if (this.errors[key] == true) {
                    this.hasError = true;
                }
            }

            //if hasError is false then it will return true as there is no errors in user input
            if (!this.hasError) {
                return true;
            }
        },
        async signup() {
            const userData = {
                first_name: this.signUpData.firstName,
                last_name: this.signUpData.lastName,
                email: this.signUpData.email,
                password: this.signUpData.password,
            };
            if (this.validate()) {
                await axios({
                    method: "post",
                    url: "/users/register",
                    data: userData,
                })
                    .then((response) => {
                        this.$emit("signedIn");

                        window.localStorage.setItem("token", response.data.jwt);

                        let user = jwt_decode(response.data.jwt).user_id;

                        router.push({
                            path: "/user/" + user,
                            params: { id: response.data.user_id },
                        });
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        capitalize(s) {
            if (typeof s !== "string") return "";
            return s.charAt(0).toUpperCase() + s.slice(1);
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
@import "../assets/global.scss";

#signup-component {
    @extend .shadow;
    background-color: white;
    height: auto;
    width: min(500px, 45vw);
    border-radius: 15px;
    padding: 15px;
    box-sizing: border-box;
    @extend .flex-column;
    margin: 5vw;

    h1 {
        color: color(green);
    }

    button {
        @extend .button;
        margin-top: 10px;
        background: color(green);
        width: 10vw;
        min-width: 200px;
        height: 4vh;
        border-radius: 5px;
        font-family: $font;
        font-size: 16px;
        letter-spacing: 1px;
    }

    .error-message-container {
        @extend .flex-column;
        background: rgba(255, 0, 0, 0.4);
        width: 300px;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .error {
        border: 1px solid red;
        border-radius: 3px;
        outline: none;
    }
    .error:focus {
        border: 2px solid red;
    }
}
</style>

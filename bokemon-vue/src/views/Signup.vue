<template>
  <form class="form" v-on:submit.prevent="addUser">
    <h1>Sign up</h1>
    <ul v-show="showError" class="errors">
      <li v-show="!validation.email">Please provide a valid email address.</li>
      <li v-show="!validation.password">Please provide a password</li>
      <li v-show="!validation.confirmPassword">Passwords do not match</li>
      <li v-show="firebaseError">{{ firebaseError }}</li>
    </ul>
    <div class="form-control">
      <input
        type="text"
        name="email"
        placeholder="E-mail address"
        v-model="email"
      />
    </div>
    <div class="form-control">
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <div class="form-control">
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
    </div>
    <button class="btn" type="submit">Register</button>
  </form>

  Have an account already?
  <router-link to="/login">Login</router-link>
</template>
<script>
import { signup } from "../firebase/firebase.js";

let emailRE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      showError: false,
      firebaseError: "",
    };
  },
  computed: {
    validation: function () {
      return {
        email: emailRE.test(this.email),
        password: !!this.password.trim(),
        confirmPassword: this.password === this.confirmPassword,
      };
    },
    isValid: function () {
      var validation = this.validation;
      return Object.keys(validation).every(function (key) {
        return validation[key];
      });
    },
  },
  methods: {
    addUser: function () {
      if (this.isValid) {
        signup(this.email, this.password)
          .then((res) => {
            this.$router.push({ path: "/" });
            this.showError = false;
          })
          .catch((error) => {
            this.firebaseError = "Failed to create an account: " + error;
            this.showError = true;
          });
      } else {
        this.showError = true;
      }
    },
  },
};
</script>

<style>
ul {
  padding: 20px;
  text-align: left;
}
.errors {
  color: rgb(100, 2, 2);
}
.form {
  padding: 50px;
}
</style>

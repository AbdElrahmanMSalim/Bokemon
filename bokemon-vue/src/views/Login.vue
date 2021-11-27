<template>
  <form class="form" v-on:submit.prevent="signIn">
    <h1>Log in</h1>
    <ul v-show="showError" class="errors">
      <li v-show="!validation.email">Please provide a valid email address.</li>
      <li v-show="!validation.password">Please provide a password</li>
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
    <button class="btn" type="submit">Login</button>
  </form>

  Need an account?
  <router-link to="/signup">Sign up</router-link>
</template>
<script>
import { login } from "../firebase/firebase.js";

let emailRE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      showError: false,
      firebaseError: "",
    };
  },
  computed: {
    validation: function () {
      return {
        email: emailRE.test(this.email),
        password: !!this.password.trim(),
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
    signIn: function () {
      if (this.isValid) {
        login(this.email, this.password)
          .then((res) => {
            this.$router.push({ path: "/" });
            this.showError = false;
          })
          .catch((error) => {
            this.firebaseError = "Failed to sign in: " + error;
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

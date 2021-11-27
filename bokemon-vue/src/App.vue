<template>
  <div id="nav">
    <router-link class="btn" to="/">Home</router-link> |
    <button v-show="user?.email" class="btn" @click="signOut">Signout</button>
    <router-link v-show="!user?.email" class="btn" to="/login"
      >Login</router-link
    >
    <span v-show="!user?.email">|</span>
    <router-link v-show="!user?.email" class="btn" to="/signup"
      >Sign up</router-link
    >
  </div>
  <h3>{{ user?.email }}</h3>
  <router-view
    v-if="$store.state.bokemonsData.length && $store.state.genders.length"
  />
</template>

<script>
import { mapActions } from "vuex";
import { getCurrentUser, logout } from "./firebase/firebase";

export default {
  data() {
    return { user: { email: "" } };
  },
  methods: {
    ...mapActions(["getAllBokemons", "getAllGenders"]),
    async signOut() {
      try {
        await logout();
        localStorage.removeItem("bokemonsData");
        this.user = {};
        this.$router.replace({ path: "/login" });
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
  created() {
    this.getAllBokemons();
    this.getAllGenders();
    getCurrentUser((user) => (this.user = user));
  },
};
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: url("~@/assets/favicon-50.png") no-repeat;
  background-position: 122% -3%;
  background-color: snow;
  background-size: contain;
  height: 100vh;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

.btn {
  padding: 30px;
  display: inline-block;
  background: rgb(226, 175, 175);
  color: rgb(255, 255, 255);
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  font-weight: bold;
  color: #4e4e4e;
}

.btn:focus {
  outline: none;
  color: #ffffff;
}
.btn:active {
  transform: scale(0.98);
  color: #ffffff;
}
.btn-block {
  display: block;
  width: 100%;
}
</style>

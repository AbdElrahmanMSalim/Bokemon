<template>
  <div id="nav">
    <router-link class="btn" to="/">Home</router-link> |
    <router-link class="btn" to="/login">Login</router-link> |
    <router-link class="btn" to="/signup">Sign up</router-link>
  </div>
  <router-view v-if="$store.state.bokemonsData.length" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: mapActions(["getAllBokemons"]),
  computed: mapGetters(["allBokemonsData"]),
  created() {
    this.getAllBokemons();
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

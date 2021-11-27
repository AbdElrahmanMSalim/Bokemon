<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="form-control">
      <input
        type="text"
        v-model="searchQuery"
        name="searchQuery"
        placeholder="Search for bokemons"
      />
    </div>
    <BokemonList :searchQuery="searchQuery" />
  </div>
</template>

<script>
import BokemonList from "@/components/BokemonList.vue";

export default {
  name: "Home",
  components: {
    BokemonList,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>

<style>
.home {
  padding: 24px;
}
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  max-width: 1200px;
  width: 95%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
  opacity: 0.85;
  border: 1px solid rgb(158, 158, 158);
  border-radius: 5px;
}

img {
  width: 20%;
}
</style>

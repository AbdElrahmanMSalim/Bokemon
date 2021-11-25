<template>
  <div class="container">
    <div class="insideContainer" :style="{ backgroundColor: bokemon.color }">
      <h1>Hey I am {{ bokemon.name }}</h1>
      <h2>I am the bokemon number {{ bokemon.id }}</h2>
      <h3>My types are: {{ bokemon.type }}</h3>

      <img :src="bokemon.image" :alt="bokemon.name" class="img" />
      <h2>Yeah, that's me :P</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import capitalizeFirstLetter from "../Utils/CapitalizeFirstLetter";

export default {
  name: "BokemonDialog",
  computed: mapGetters(["allBokemonsData"]),
  data() {
    return { bokemon: {} };
  },
  methods: {
    capitalizeFirstLetter,
  },
  mounted() {
    this.bokemon = this.allBokemonsData.find(
      (el) => el.id == this.$route.query.id
    );
  },
};
</script>

<style scoped>
.img {
  width: 209px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.insideContainer {
  margin: 100px;
  padding: 37px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 95%;
  border-radius: 12px;
}

.insideContainer:hover {
  opacity: 95%;
  transform: scale(1.02);
}
</style>

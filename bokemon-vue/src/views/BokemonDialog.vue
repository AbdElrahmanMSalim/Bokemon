<template>
  <div class="container">
    <div class="insideContainer" :style="{ backgroundColor: bokemon.color }">
      <h1>Hey I am {{ bokemon.name }}</h1>
      <h2>I am the bokemon number {{ bokemon.id }}</h2>
      <h3>My types are: {{ bokemon.type }}</h3>

      <img :src="bokemon.image" :alt="bokemon.name" class="img" />
      <h2>Yeah, that's me :P</h2>
      <button class="dialogBtn" @click="show = !show">Show My Abilities</button>
    </div>

    <transition name="fade">
      <div
        v-if="show"
        class="insideContainer"
        :style="{ backgroundColor: bokemon.color }"
      >
        <h1>My Abilities</h1>
        <h2>I am so strong you know</h2>

        <div
          class="abilities"
          :key="ability"
          v-for="ability in bokemon.abilities"
        >
          <h3>
            {{ capitalizeFirstLetter(ability.name) }}
          </h3>

          <h4>{{ ability.effect }}</h4>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import capitalizeFirstLetter from "../Utils/CapitalizeFirstLetter";
import axios from "axios";

export default {
  name: "BokemonDialog",
  computed: mapGetters(["allBokemonsData"]),
  data() {
    return { bokemon: { abilities: [] }, show: true };
  },
  methods: {
    capitalizeFirstLetter,
  },
  mounted() {
    const bokemon = this.allBokemonsData.find(
      (el) => el.id == this.$route.query.id
    );
    bokemon.abilities.map(({ ability }) => {
      axios.get(ability.url).then((res) => {
        const effect = res.data.effect_entries.filter(
          (el) => el.language.name === "en"
        )[0].effect;
        this.bokemon = {
          ...bokemon,
          abilities: [
            ...this.bokemon.abilities,
            {
              name: ability.name,
              effect,
            },
          ],
        };
      });
    });
  },
};
</script>

<style scoped>
.dialogBtn {
  padding: 30px;
  margin: 16px;
  display: inline-block;
  /* background: rgb(226, 175, 175); */
  color: rgb(255, 255, 255);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  font-weight: bold;
  color: #4e4e4e;
}

.dialogBtn:hover {
  outline: none;
  color: #9b9b9b;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.img {
  width: 209px;
}

.abilities {
  margin-right: auto;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.insideContainer {
  height: 100%;
  width: 350px;
  margin: 50px;
  padding: 37px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
}

.insideContainer:hover {
  opacity: 95%;
  transform: scale(1.02);
}
</style>

<template>
  <div class="cards">
    <div v-for="bokemon in allBokemonsData" :key="bokemon.id">
      <Card :bokemon="bokemon" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "BokemonList",
  props: {
    searchQuery: String,
  },
  components: { Card },
  methods: { ...mapActions(["getAllBokemons"]) },
  computed: {
    ...mapGetters(["allBokemonsData"]),
    //   filteredBokemons: function () {
    //     var self = this;
    //     return self.allBokemonsData.filter(function (user) {
    //       return user.name.indexOf(self.searchQuery) !== -1;
    //     });
    //   },
  },
  created() {
    this.getAllBokemons();
  },
};
</script>

<style>
.cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>

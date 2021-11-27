<template>
  <div class="cards">
    <div v-for="bokemon in filteredBokemons" :key="bokemon.id">
      <Card :bokemon="bokemon" class="bokemon" @click="openDialog(bokemon)" />
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
  data() {
    return {
      openBokemonDialog: true,
    };
  },
  components: { Card },

  methods: {
    openDialog(bokemon) {
      this.openBokemonDialog = true;

      this.$router.push({
        name: "BokemonDialog",
        query: {
          id: bokemon.id,
        },
      });
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["allBokemonsData"]),
    filteredBokemons: function () {
      var self = this;
      return self.allBokemonsData.filter(function (user) {
        return user.name.indexOf(self.searchQuery) !== -1;
      });
    },
  },
};
</script>

<style>
.routerLink {
  text-decoration: none;
}

.bokemon:hover {
  opacity: 0.95;
  transform: scale(1.02);
  cursor: pointer;
}

.cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>

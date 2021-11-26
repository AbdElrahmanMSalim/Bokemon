import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    bokemonsData: [],
    favorites: [],
    genders: [],
  },
  mutations: {
    setBokemonsData: (state, bokemons) => (state.bokemonsData = bokemons),
    setGenders: (state, genders) => (state.genders = genders),
  },
  actions: {
    async getAllBokemons({ commit }) {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      const data = [];
      response.data.results.map((bokemon) => {
        data.push(axios.get(bokemon.url));
      });
      const responses = await axios.all(data);
      const mappedData = responses.map((response, i) => {
        const { data } = response;
        return {
          name: data.name,
          id: data.id,
          image: data.sprites["front_default"],
          type: data.types.map((type) => type.type.name).join(", "),
          ability: data.abilities
            .map((ability) => ability.ability.name)
            .join(","),
          species: data.species,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
          stats: data.stats,
          color:
            i % 6 === 0
              ? "#4FC1A5"
              : i % 6 === 4
              ? "#F7786B"
              : i % 6 === 3
              ? "#58AAF6"
              : i % 6 === 2
              ? "#FFCE4B"
              : i % 6 === 1
              ? "#b584c8"
              : "#B1736C",
          moves: data.moves
            .map((move) => move.move.name)
            .slice(0, 10)
            .join(", "),
        };
      });
      commit("setBokemonsData", mappedData);
    },
    async getAllGenders({ commit }) {
      const femalesResponse = await axios.get(
        `https://pokeapi.co/api/v2/gender/1`
      );
      const females = femalesResponse.data.pokemon_species_details.map(
        (el) => ({
          name: el.pokemon_species.name,
          gender: "Female",
        })
      );
      const malesResponse = await axios.get(
        `https://pokeapi.co/api/v2/gender/2`
      );
      const males = malesResponse.data.pokemon_species_details.map((el) => ({
        name: el.pokemon_species.name,
        gender: "Female",
      }));

      const genderlessResponse = await axios.get(
        `https://pokeapi.co/api/v2/gender/3`
      );
      const genderless = genderlessResponse.data.pokemon_species_details.map(
        (el) => ({
          name: el.pokemon_species.name,
          gender: "Genderless",
        })
      );

      commit("setGenders", [...females, ...males, ...genderless]);
    },
  },
  getters: {
    allBokemonsData: (state) => state.bokemonsData,
    genders: (state) => state.genders,
  },

  modules: {},
});

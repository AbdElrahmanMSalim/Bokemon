<template>
  <div class="cardContainer" :style="{ background: bokemon.color }">
    <div class="cardHeading">
      <div>
        <h2>{{ capitalizeFirstLetter(bokemon.name) }}</h2>
        <h4>{{ capitalizeFirstLetter(bokemon.type) }}</h4>
      </div>
    </div>

    <div class="cardContent">
      <img :src="bokemon.image" :alt="bokemon.name" />
    </div>
  </div>
</template>

<script>
import capitalizeFirstLetter from "../Utils/CapitalizeFirstLetter";
export default {
  name: "Card",
  props: {
    bokemon: Object,
  },
  methods: {
    capitalizeFirstLetter,
  },
};
</script>

<style>
.cardHeading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}

.cardContainer {
  padding: 24px;
  border-radius: 8px;
}

.cardContent {
  height: 220px;
}

.cardContent img {
  width: 209px;
}
.cardActions {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

h2 {
  margin: 0;
  text-align: left;
  color: white;
}

h4 {
  margin-block-start: 0.5em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding: 4;
  text-align: left;
  color: antiquewhite;
}
</style>

<script setup>
import AOS from "aos";

import P from "../services/Pokedex";
import { onMounted, ref } from "vue";

import pokemonCard from "../components/pokemonCard.vue";
import loading from "../components/loading.vue";

let pokemonList = ref([]);
const numberOfPok = ref(0);
const limit = 48;
const isLoading = ref(false);

async function fetchPokemon(offset = 0) {
  isLoading.value = true;
  await P.getPokemonsList({ offset, limit }).then(function (response) {
    for (let i = 0; i < response.results.length; i++) {
      let pokemon = response.results[i];
      console.log(numberOfPok.value);

      let currentPokemon = {
        name: pokemon.name,
        url: `/pokemon/${pokemon.name}`,
        pokemonImgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          i + numberOfPok.value + 1
        }.png`,
        pokemonImgAlt: `Image du pokemon ${pokemon.name}`,
        id: i + numberOfPok.value + 1,
      };
      pokemonList.value.push(currentPokemon);
    }
  });

  numberOfPok.value += 24;
  isLoading.value = false;
}

onMounted(() => {
  AOS.init();
  fetchPokemon(numberOfPok.value);
});

AOS.init();
</script>

<template>
  <div class="backgroundImg"></div>

  <div class="verticalAlign mainContentDiv">
    <h1 class="bigTitle">Liste des pokémons</h1>

    <div class="pokemonGrid">
      <pokemonCard
        v-for="pokemon in pokemonList"
        :key="pokemon.name"
        :name="pokemon.name"
        :url="pokemon.url"
        :pokemonImgUrl="pokemon.pokemonImgUrl"
        :pokemonImgAlt="pokemon.pokemonImgUrl"
        :id="pokemon.id"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="500"
      />
    </div>
    <loading v-if="isLoading === true"></loading>

    <button
      v-if="isLoading === false"
      class="loadMoreBtn"
      @click="fetchPokemon(numberOfPok)"
    >
      Load {{ limit }} more
    </button>
  </div>
</template>
<style>
.backgroundImg {
  top: 0px;
  position: fixed;
  background-image: url("../assets/pokebg.png");
  opacity: 30%;
  background-size: 150px;
  background-repeat: unset;
  background-blend-mode: light;
  width: 100vw;
  height: 100vh;
  z-index: -3;
  filter: brightness(50%);
}

.mainContentDiv {
  z-index: 2;
  display: flex;
  margin: 0px 5vw 2vh 5vw;
}

.loadMoreBtn {
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  margin: 20px;
  text-decoration: none;
  padding: 20px 30px;
  border: none;
  border-radius: 62% 38% 70% 30% / 37% 43% 57% 63%;
  background-color: rgba(51, 162, 51, 1);
}

.pokemonGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 5vw;
  }


@media screen and (max-width: 1100px){
    .pokemonGrid{
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 5vw;

    }
}



@media screen and (max-width: 600px){
    .pokemonGrid{
        display: flex;
        flex-direction: column;
    }
}


</style>

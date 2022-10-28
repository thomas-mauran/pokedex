<script setup>

import P from "../services/Pokedex"
import {onMounted, ref} from "vue"

import pokemonCard from "../components/pokemonCard.vue"

let pokemonList = ref([])
const numberOfPok = ref(0)
const limit = 24

async function fetchPokemon(offset = 0){
    await P.getPokemonsList({ offset, limit}).then(function(response) {
        for(let i = 0; i < response.results.length; i ++){
            let pokemon = response.results[i]
            console.log(numberOfPok.value)

            let currentPokemon = {
                name: pokemon.name,
                url: `/pokemon/${pokemon.name}`,
                pokemonImgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + numberOfPok.value +1}.png`,
                pokemonImgAlt: `Image du pokemon ${pokemon.name}`
            }
            pokemonList.value.push(currentPokemon)
        }
        
    })
    numberOfPok.value += 24
}

onMounted(() => {
    fetchPokemon(numberOfPok.value)
})

</script>

<template>
    <div class="verticalAlign mainContentDiv">
        <h1 class="bigTitle">Liste des pokémons</h1>
        <div class="pokemonGrid">
            <pokemonCard v-for="pokemon in pokemonList" :key="pokemon.name" :name="pokemon.name" :url="pokemon.url" :pokemonImgUrl="pokemon.pokemonImgUrl" :pokemonImgAlt="pokemon.pokemonImgUrl"/>
        </div>
        <button class="loadMoreBtn" @click="fetchPokemon(numberOfPok)"> Load {{limit}} more </button>
    </div>
</template>
<style>

.mainContentDiv{
    display: flex;
    margin: 0px 5vw 2vh 5vw;
}

.loadMoreBtn{
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    margin: 20px;
    text-decoration: none;
    padding: 20px 30px;
    border: none;
    border-radius: 62% 38% 70% 30% / 37% 43% 57% 63%  ;
    background-color: green;
}
.pokemonGrid{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 5vw;
}



</style>
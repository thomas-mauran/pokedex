<script setup>

import P from "../services/Pokedex"
import {onMounted, ref} from "vue"

import pokemonCard from "../components/pokemonCard.vue"

let pokemonList = ref([])

function fetchPokemon(){
    P.getPokemonsList({offset: 0, limit: 24}).then(function(response) {
        for(let i = 0; i < response.results.length; i ++){
            let pokemon = response.results[i]

            let currentPokemon = {
                name: pokemon.name,
                url: `/pokemon/${i+1}`,
                pokemonImgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
                pokemonImgAlt: `Image du pokemon ${pokemon.name}`
            }
            pokemonList.value.push(currentPokemon)
        }
        
    })
    
}

onMounted(() => {
    fetchPokemon()
})


</script>

<template>
    <main class="verticalAlign">
        <h1 class="bigTitle">Liste des pokémons</h1>
        <div class="pokemonGrid">
            <pokemonCard v-for="pokemon in pokemonList" :key="pokemon.name" :name="pokemon.name" :url="pokemon.url" :pokemonImgUrl="pokemon.pokemonImgUrl" :pokemonImgAlt="pokemon.pokemonImgUrl"/>
        </div>
    </main>
</template>
<style>
.pokemonGrid{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 5vw;
}



</style>
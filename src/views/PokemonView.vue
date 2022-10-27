<script setup>

    function fetchPokemonInfo(){
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

</script>
<template>

    <h1>Pokemon : </h1>
    <h1>{{}}</h1>

</template>
<style></style>
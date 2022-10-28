<script setup>
import P from "../services/Pokedex"
import { useRoute } from 'vue-router';
import {onMounted, ref} from "vue"

const route = useRoute();  
const name = route.params.id;
let pokemon = ref({})

    function fetchPokemonInfo(){
        P.getPokemonByName(name).then(function(response) {
            pokemon.value = response
            console.log(response)
        })
    }

    onMounted(() => {
        fetchPokemonInfo()
    })

</script>
<template>

    <main>

        <article>
            <h1>{{pokemon.name}}</h1>
        </article>
        <aside>
            <img :src="pokemon.sprites.front_default" alt="image of the pokemon">
        </aside>

    </main>

</template>
<style></style>
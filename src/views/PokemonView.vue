<script setup>
import P from "../services/Pokedex"
import { useRoute } from 'vue-router';
import { onMounted, ref } from "vue"
import pokemonRadarChart from "../components/pokemonRadarChart.vue";
import {randomBorderRadius, randomColorBg} from "../services/randomStyle"

const route = useRoute();
const name = route.params.id;

const customStyle = randomBorderRadius() + randomColorBg()


let pokemon = ref({})
let pokeImg = ref("")
let typeImg = ref([])
let statsList = ref([])

function fetchPokemonInfo() {
    P.getPokemonByName(name).then(function (response) {
        pokemon.value = response
        pokeImg.value = response.sprites.other["official-artwork"].front_default
        response.types.forEach(element => {
            typeImg.value.push(`https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_${element["type"].name}_Icon.svg/120px-Pok%C3%A9mon_${element["type"].name}_Icon.svg.png`)
        });

        response.stats.forEach(stat => {
            statsList.value.push(stat.base_stat)
        })
        console.log(typeImg.value)
    })
}

onMounted(() => {
    fetchPokemonInfo()
})

</script>
<template>

    <div class="backgroundImg"></div>
    <div class="mainContentDiv">

        <article>
            <h1 class="bigTitle">{{ pokemon.name }}</h1>
            <h2>Height : {{ pokemon.height }}</h2>
            <h2>Weight : {{ pokemon.weight }}</h2>

            <pokemonRadarChart :seriesData="statsList" />


        </article>
        <article>
            <img class="pokeImgBig" :src="pokeImg" alt="image of the {{pokemon.name}}" :style="customStyle">
        </article>

    </div>

</template>
<style scoped>

.pokeImgBig{
    width: 20vw;
    padding: 20px;
}
.mainContentDiv {
    background-color: rgba(255, 255, 255, 1);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 3px 3px 3px black;
    margin: 3vw;
}

article {

    width: 50vw;
}
</style>
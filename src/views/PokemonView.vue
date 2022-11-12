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
let pokeType = ref([])
let statsList = ref([])

function fetchPokemonInfo() {
    P.getPokemonByName(name).then(function (response) {
        pokemon.value = response
        pokeImg.value = response.sprites.other["official-artwork"].front_default
        response.types.forEach(element => {
            pokeType.value.push(element.type.name)
        });

        response.stats.forEach(stat => {
            statsList.value.push(stat.base_stat)
        })
        console.log(pokeType.value)
        console.log(pokeType.value.length)


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
            <div class="typeDiv">
                <h2>{{pokeType.length > 2 ? 'Types' : 'Type'}}</h2>

                <h3 v-for="t in pokeType" :class="t">{{t}}</h3>
            </div>
            <pokemonRadarChart :seriesData="statsList" />



        </article>
        <article>
            <img class="pokeImgBig" :src="pokeImg" alt="image of the {{pokemon.name}}" :style="customStyle">
        </article>

    </div>

</template>
<style scoped>

/* Type colors  */

.grass{
    background-color: rgb(40, 140, 40);
}

.poison{
    background-color: blueviolet;
}

.fire{
    background-color: orangered;
}

.water{
    background-color: blue;
}

.typeDiv{
    display: flex;
}

.typeDiv h3{
    border-radius: 10px;
    padding: 5px;
    color: white;
    margin: 10px;
}

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
<script setup>
import P from "../services/Pokedex"
import { useRoute } from 'vue-router';
import { onMounted, ref } from "vue"
import pokemonRadarChart from "../components/pokemonRadarChart.vue";
import {randomBorderRadius, randomColorBg} from "../services/randomStyle"

const route = useRoute();
const name = route.params.id;

const customStyle = randomBorderRadius() + randomColorBg()


const pokemon = ref({})
const pokeImg = ref("")
const pokeType = ref([])
const statsList = ref([])
const evolutionChain = ref([])

function fetchPokemonInfo() {
    P.getPokemonByName(name).then(function (response) {
        pokemon.value = response
        pokeImg.value = response.sprites.other["official-artwork"].front_default
        pokeType.value = [...response.types]
        // statsList.value = response.stats.map(stat => stat.base_stat)
        // console.log(statsList.value)

        response.stats.forEach(stat => {
            statsList.value.push(stat.base_stat)
        })

        
    })


}

function fetchEvolutionChain(id){
    P.getEvolutionChainById(id).then(function(response){
        evolutionChain.value = response
        console.log(evolutionChain.value)
    })
}

onMounted(() => {
    fetchPokemonInfo()
    // fetchEvolutionChain(pokemon.value.id)
})

</script>
<template>

    <div class="backgroundImg"></div>
    <div class="mainContentDiv">
        <div class="container">
            <article>
                <img class="pokeImgBig" :src="pokeImg" alt="image of the {{pokemon.name}}" :style="customStyle">

            </article>

            <article>
                <h1 class="bigTitle">{{ pokemon.name }}</h1>
                <div class="typeDiv">
                    <h3 v-for="t in pokeType" :class="t.type.name">{{t.type.name}}</h3>
                </div>
                <ul>
                    <li>Height : {{ pokemon.height }}</li>
                    <li>Weight : {{ pokemon.weight }}</li>
                    <li>Base experience : {{pokemon.base_experience}}</li>
                </ul>


                <pokemonRadarChart class="chart" :seriesData="statsList" />


            </article>
        </div>
    </div>

</template>
<style scoped>


/* Actual css */

.chart{
    padding-right: 100px;
}
.bigTitle{
    font-size: 3em;
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
    min-width: 200px;
}
.mainContentDiv {
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    margin: 20px;
}

.container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: rgba(255, 255, 255, 1);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 3px 3px 3px black;
    width: 70vw;
}

article {
    width: 30vw;
}



/* Type colors  */

.normal{
    background-color: grey;
}

.flying{
    background-color: rgb(130, 207, 207);
}
.bug{
    background-color: rgb(155, 184, 111);
}

.ground{
    background-color: rgb(188, 157, 100);
}

.rock{
    background-color: rgb(85, 53, 8);
}
.grass{
    background-color: rgb(40, 140, 40);
}

.ghost{
    background-color: rgb(86, 86, 167);
}
.dark{
    background-color: rgb(27, 21, 18);
}

.electric{
    background-color: rgb(236, 211, 48);
}

.psychic{
    background-color: purple;
}

.steel{
    background-color: rgb(147, 161, 161);
}

.fighting{
    background-color: rgb(193, 92, 56);
}

.ice{
    background-color: rgb(117, 209, 193);
}

.fairy{
    background-color: rgb(232, 183, 191);
}

.poison{
    background-color: blueviolet;
}

.fire{
    background-color: orange;
}

.water{
    background-color: blue;
}

</style>
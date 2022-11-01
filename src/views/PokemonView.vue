<script setup>
import P from "../services/Pokedex"
import { useRoute } from 'vue-router';
import {onMounted, ref} from "vue"
import pokemonRadarChartVue from "../components/pokemonRadarChart.vue";
import {randomBorderRadius, randomColor} from "../services/randomStyle"

const route = useRoute();  
const name = route.params.id;



let pokemon = ref({})
let pokeImg = ref("")
let typeImg = ref([])
let statsList = ref([])

    function fetchPokemonInfo(){
        P.getPokemonByName(name).then(function(response) {
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

    const customStyle = randomBorderRadius() + randomColor()

</script>
<template>

    <div class="verticalAlign mainDiv" >
        <div class="colorBackground" >
            <img class="bigImage" :src="pokeImg" alt="image of the pokemon {{pokemon.name}}">
            <h1 class="bigTitle">{{pokemon.name}}</h1>
        </div>
            <div class="horizontalAlign">

            <article>
                <h2>Height : {{pokemon.height}}</h2>
                <h2>Weight : {{pokemon.weight}}</h2>
            </article>
            <article>
                <pokemonRadarChartVue :seriesData="statsList"/>
                
            </article>
        </div>



            <img v-for="t in typeImg" :src="t" :alt="t">



    </div>

</template>
<style>

.mainDiv{
    margin: 100px;
}

.colorBackground{
    padding: 50px;
}

.bigImage{
    width: 10vw;
}

.horizontalAlign{
    display: flex;
    flex-direction: row;
}

article{
    width: 40vw;
}


</style>
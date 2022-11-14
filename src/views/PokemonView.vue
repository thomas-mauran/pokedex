<script setup>
import P from "../services/Pokedex"
import { useRoute } from 'vue-router';
import { onMounted, ref } from "vue"
import pokemonRadarChart from "../components/pokemonRadarChart.vue";
import { randomBorderRadius, randomColorBg } from "../services/randomStyle"
import pokemonCard from "../components/pokemonCard.vue";

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
        fetchEvolutionChain(pokemon.value.name)


    })


}


function reccursiveEvolRetrieve(arr) {
    // Base case
    if (!arr.evolves_to) {
        return
    }
    let id = arr.species.url.split("/")[6]
    evolutionChain.value.push({
        name: arr.species.name,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        id: id,
        url: `/pokemon/${arr.species.name}`

    })
    reccursiveEvolRetrieve(arr.evolves_to[0])
}

function fetchEvolutionChain(name) {
    P.getPokemonSpeciesByName(name).then(function (response) {
        let pokemonSpeciesId = response.evolution_chain ? response.evolution_chain.url.split("/")[6] : null

        // retrieve the pokemon species to then retrieve the evolution chain id 

        P.getEvolutionChainById(pokemonSpeciesId).then(function (response) {
            reccursiveEvolRetrieve(response.chain)
        })

    })




}

onMounted(() => {
    fetchPokemonInfo()

})

</script>
<template>

    <div class="backgroundImg"></div>
    <div class="mainContentDiv">
        <div class="container">
            <article>
                <img class="pokeImgBig" :src="pokeImg" alt="image of the {{pokemon.name}}" :style="customStyle">
                <pokemonRadarChart class="chart" :seriesData="statsList" />

            </article>

            <article>
                <h1 class="bigTitle">{{ pokemon.name }}</h1>
                <div class="typeDiv">
                    <h3 v-for="t in pokeType" :class="t.type.name">{{ t.type.name }}</h3>
                </div>

                <ul>
                    <li>Id : #{{ pokemon.id }}</li>
                    <li>Height : {{ pokemon.height }}</li>
                    <li>Weight : {{ pokemon.weight }}</li>
                    <li>Base experience : {{ pokemon.base_experience }}</li>
                </ul>

                <h1>Evolutions :</h1>

                <div class="evolutionList">
                    <pokemonCard v-for="evol in evolutionChain" :key="evol.id" :name="evol.name" :url="evol.url"
                        :pokemonImgUrl="evol.img" :pokemonImgAlt="evol.name" :id="evol.id" :evolCard=true />
                </div>
            </article>

        </div>
    </div>

</template>
<style scoped>
/* Actual css */

.evolutionList {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.chart {
    padding-right: 100px;
}

.bigTitle {
    font-size: 3em;
}

.typeDiv {
    display: flex;
}

.typeDiv h3 {
    border-radius: 10px;
    padding: 5px;
    color: white;
    margin: 10px;
}

.pokeImgBig {
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

.container {
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

.normal {
    background-color: grey;
}

.flying {
    background-color: rgb(130, 207, 207);
}

.bug {
    background-color: rgb(155, 184, 111);
}

.ground {
    background-color: rgb(188, 157, 100);
}

.rock {
    background-color: rgb(85, 53, 8);
}

.grass {
    background-color: rgb(40, 140, 40);
}

.ghost {
    background-color: rgb(86, 86, 167);
}

.dark {
    background-color: rgb(27, 21, 18);
}

.electric {
    background-color: rgb(236, 211, 48);
}

.psychic {
    background-color: purple;
}

.steel {
    background-color: rgb(147, 161, 161);
}

.fighting {
    background-color: rgb(193, 92, 56);
}

.ice {
    background-color: rgb(117, 209, 193);
}

.fairy {
    background-color: rgb(232, 183, 191);
}

.poison {
    background-color: blueviolet;
}

.fire {
    background-color: orange;
}

.water {
    background-color: blue;
}
</style>
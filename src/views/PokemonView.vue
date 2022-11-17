<script setup>
import P from "../services/Pokedex"
import { useRoute } from 'vue-router';
import { onMounted, ref } from "vue"
import pokemonRadarChart from "../components/pokemonRadarChart.vue";
import { randomBorderRadius, randomColorBg } from "../services/randomStyle"
import pokemonCard from "../components/pokemonCard.vue";
import loading from "../components/loading.vue"
const route = useRoute();
const name = route.params.id;

const customStyle = randomBorderRadius() + randomColorBg()


const pokemon = ref({})
const pokeImg = ref("")
const pokeType = ref([])
const statsList = ref([])
const evolutionChain = ref([])
const customEvolGridClass = ref("")
const pokemonExists = ref(null)


function fetchPokemonInfo() {
    P.getPokemonByName(name).then(function (response) {

        pokemon.value = response
        let existsAnimatedSprite = response.sprites.versions["generation-v"]["black-white"].animated.front_default
        console.log(existsAnimatedSprite)
        pokeImg.value = existsAnimatedSprite ? existsAnimatedSprite : response.sprites.front_default
        console.log(pokeImg.value)
        if(pokeImg.value == null) {
            pokeImg.value = "/src/assets/unknown.png"
        }
        pokeType.value = [...response.types]
        // statsList.value = response.stats.map(stat => stat.base_stat)

        response.stats.forEach(stat => {
            statsList.value.push(stat.base_stat)
        })
        fetchEvolutionChain(pokemon.value.name)

        pokemonExists.value = true

    }).catch(function (error) {
        pokemonExists.value = false
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


    arr.evolves_to.forEach((element) => {
        reccursiveEvolRetrieve(element)
    })

}

function fetchEvolutionChain(name) {
    P.getPokemonSpeciesByName(name).then(function (response) {

        pokemon.value.description = response.flavor_text_entries.filter(elem => elem.language.name == "en")[0].flavor_text
        let pokemonSpeciesId = response.evolution_chain ? response.evolution_chain.url.split("/")[6] : null

        // retrieve the pokemon species to then retrieve the evolution chain id 

        P.getEvolutionChainById(pokemonSpeciesId).then(function (response) {
            reccursiveEvolRetrieve(response.chain)

            // resize the evolList grid



            customEvolGridClass.value = `grid-template-columns: repeat(${evolutionChain.value.length > 3 ? 3 : evolutionChain.value.length}, 1fr);`
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
        
        <section class="container" v-if="pokemonExists === true">
            <!-- Big screen -->
            <article class="bigScreen">
                <picture :style="customStyle">
                    <img class="pokeImgBig"  :src="pokeImg" :alt="'image of ' + pokemon.name">
                </picture>     
                <pokemonRadarChart class="chart" :seriesData="statsList" />
            </article>

            <article>
                <picture :style="customStyle">
                    <img class="pokeImgBig smallScreen" :src="pokeImg" :alt="'image of ' + pokemon.name">
                </picture>
                <h1 class="bigTitle">{{ pokemon.name }} #{{pokemon.id}}</h1>
                <div class="typeDiv">
                    <h3 v-for="t in pokeType" :class="t.type.name">{{ t.type.name }}</h3>
                </div>
                <h2>Description : </h2>
                <p>{{ pokemon.description }}</p>

                <h2>Infos : </h2>
                <ul>
                    <li>Height : {{ pokemon.height }}</li>
                    <li>Weight : {{ pokemon.weight }}</li>
                    <li>Base experience : {{ pokemon.base_experience }}</li>
                </ul>

                <h2>Evolutions :</h2>

                <!-- Big screen -->
                <picture v-if="evolutionChain.length !== 0" class="evolutionList bigScreen" :style="customEvolGridClass">
                    <pokemonCard v-for="evol in evolutionChain" :key="evol.id" :name="evol.name" :url="evol.url"
                        :pokemonImgUrl="evol.img" :pokemonImgAlt="evol.name" :id="evol.id" :evolCard=true />
                </picture>

                <!-- Small screen -->
                <picture v-if="evolutionChain.length !== 0" class="evolutionList smallScreen">
                    <pokemonCard v-for="evol in evolutionChain" :key="evol.id" :name="evol.name" :url="evol.url"
                        :pokemonImgUrl="evol.img" :pokemonImgAlt="evol.name" :id="evol.id" :evolCard=true />
                </picture>

                <h2 v-if="evolutionChain.length === 0" class="redText">Not any evolutions</h2>

                <pokemonRadarChart class="chart smallScreen" :seriesData="statsList" />
            </article>

        </section>
        <section v-else-if="pokemonExists === false"  class="container"  >
            <!-- insert gif  -->
            <h1 class="bigTitle">Pokemon not found</h1>
        </section>
        
        <section v-else>
            <loading style="width: 300px"/>
        </section>

    </div>

</template>
<style scoped>
/* Actual css */

.redText{
    color: brown;
}

picture{
    display: flex;
    width: fit-content;
}

h2 {
    margin-top: 20px;
    font-weight: bold;
}


.evolutionList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 2px solid black;
    border-radius: 10px;
    width: fit-content;
}


.smallScreen {
    display: none;
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
    width: 17vw;
    padding: 40px;
    min-width: 200px;
    image-rendering: pixelated;
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
    min-width: 400px;

    padding: 20px;
    border-radius: 15px;
    box-shadow: 3px 3px 3px black;
    width: 75vw;
}

article {
    width: 30vw;
}



@media screen and (max-width: 1400px) {
    .chart {
        padding: 0px 0px 0px 40px;
    }
    .mainContentDiv {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }


    .smallScreen {
        display: flex;
    }


    .bigScreen {
        display: none;
    }

    article {
        display: flex;
        flex-direction: column;
        align-items: center;
    }


}



@media screen and (max-width: 650px) {

    .evolutionList {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
    }
    .bigScreen {
        display: none;
    }

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

.dragon{
    background-color: rgb(68, 8, 163);
}
</style>
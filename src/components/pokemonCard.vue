<script setup>

import {randomBorderRadius, randomColor, randomColorBg} from "../services/randomStyle"

import {defineProps, ref} from "vue"
const props = defineProps({
    name: String,
    pokemonImgUrl: String,
    pokemonImgAlt: String,
    url: String,
    id: String,
    evolCard: {
        type: Boolean, 
        default: false
    },
})

let customStyle
if(props.evolCard === false){
    customStyle = randomBorderRadius() + randomColor()
}


const customClass = props.evolCard ? 'evolCard' : 'pokemonCard'
console.log(customStyle)
</script>
<template>

    <a :class="customClass" :href="url" :style="customStyle">
        <img :src="pokemonImgUrl" :alt="pokemonImgAlt">
        <h4>#{{id}}</h4>
        <h2>{{name}}</h2>
    </a>

</template>
<style scoped>

    .pokemonCard{
        background-color: white;
        min-width: 200px;
        max-width: 200px;
        padding: 40px 0px;
        margin: 20px;
        box-shadow: 3px 3px 3px 3px black;
        transition: 0.1s ease-in-out;
        cursor: pointer;
        color: black;
        transition: 0.1s ease-in-out;
        border-radius: 50% 50% 50% 50% / 50% 50% 50% 50% ;
    }

    .pokemonCard:hover{
        background-color: rgba(240, 240, 240, 1);
    }

    .evolCard{
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
        width: 200px;
        margin: 20px;
        transition: 0.1s ease-in-out;
        cursor: pointer;
        color: black;
    }

    .evolCard h2{
        font-size: 1em;
    }
    .evolCard img {
        max-width: 100px;
    }
    

</style>
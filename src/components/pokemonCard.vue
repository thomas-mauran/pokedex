<script setup>

import {randomBorderRadius, randomColor} from "../services/randomStyle"

import {defineProps, ref} from "vue"
const props = defineProps({
    name: String,
    pokemonImgUrl: String,
    pokemonImgAlt: String,
    url: String,
    id: String
})

const customStyle = randomBorderRadius() + randomColor()

</script>
<template>

    <a class="pokemonCard" :href="url" :style="customStyle">
        <img :src="pokemonImgUrl" :alt="pokemonImgAlt">
        <h4>#{{id}}</h4>
        <h2>{{name}}</h2>
    </a>

</template>
<style scoped>

    .pokemonCard{
        min-width: 200px;
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
        background-color: rgba(0, 0, 0, 0.1);
    }

</style>
<script setup>



import {defineProps} from "vue"
const props = defineProps({
    name: String,
    pokemonImgUrl: String,
    pokemonImgAlt: String,
    url: String
})

</script>
<template>

    <a class="pokemonCard" :href="url">
        <img :src="pokemonImgUrl" :alt="pokemonImgAlt">
        <h2>{{name}}</h2>
    </a>

</template>
<style scoped>

    .pokemonCard{
        min-width: 200px;
        border-radius: 10px;
        padding: 30px;
        margin: 20px;
        box-shadow: 3px 3px 3px 3px black;
        transition: 0.1s ease-in-out;
        cursor: pointer;
        color: black;
    }

    .pokemonCard:hover{
        transform: scale(1.1);
    }

</style>
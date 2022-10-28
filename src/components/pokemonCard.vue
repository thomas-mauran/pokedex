<script setup>



import {defineProps, ref} from "vue"
const props = defineProps({
    name: String,
    pokemonImgUrl: String,
    pokemonImgAlt: String,
    url: String
})

function randomNumber(max, min){
    return Math.floor(Math.random() * max) + min; 

}

function randomBorderRadius(){
    let string = `border-radius: 50% 50% ${randomNumber(70, 40)}% ${randomNumber(70, 40)}% / 50% ${randomNumber(70, 40)}% 50% ${randomNumber(70, 40)}%;`
    return string
}

function randomColor(){
    return `box-shadow: 0px 5px 5px 3px rgba(${randomNumber(255, 50)}, ${randomNumber(255, 50)}, ${randomNumber(200, 50)}, 0.8`

}

const customStyle = randomBorderRadius() + randomColor()

</script>
<template>

    <a class="pokemonCard" :href="url" :style="customStyle">
        <img :src="pokemonImgUrl" :alt="pokemonImgAlt">
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
    }

    .pokemonCard:hover{
        background-color: rgba(0, 0, 0, 0.1);
    }

</style>
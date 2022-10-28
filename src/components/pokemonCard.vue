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
    let string = "border-radius:"
    for(let i = 0; i < 8; i ++){
        string += ` ${randomNumber(65, 40)}%`
        if(i === 3) string += " /"
    }
    string += ";"
    return string
}

function randomColor(){
    return `background-color: rgba(${randomNumber(255, 0)}, ${randomNumber(255, 0)}, ${randomNumber(255, 0)}, 0.4`

}

const customStyle = randomBorderRadius() + randomColor()
console.log(customStyle)

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
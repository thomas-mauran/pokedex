<script setup>
import {ref, defineProps} from "vue"
const props = defineProps({
    name: String,
    pokemonImgUrl: String,
    pokemonImgAlt: String,
    url: String
})

</script>
<template>

    <div class="pokemonCard">
        <img :src="pokemonImgUrl" :alt="pokemonImgAlt">
        <h2>{{name}}</h2>
    </div>

</template>
<style scoped>

    .pokemonCard{
        min-width: 200px;
        border-radius: 10px;
        padding: 30px;
        margin: 20px;
        box-shadow: 3px 3px 3px 3px black;
    }

</style>
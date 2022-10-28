
<script setup>

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <main class="verticalAlign " >


    <h1 class="bigTitle">Pokédex</h1>

      <nav>
        <RouterLink to="/">Home</RouterLink>

      </nav>
    </main>

  </header>

  <RouterView />
</template>

<style>

.bigTitle{
  font-weight: bold;
}

.verticalAlign{
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

nav a{
  padding: 30px;
}


</style>

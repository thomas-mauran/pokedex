
<script setup>

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <main class="verticalAlign " >



      <nav>
        <RouterLink to="/" class="mainTitle">Pokedex</RouterLink>

      </nav>
    </main>

  </header>

  <RouterView />
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');


.mainTitle{
  font-weight: bold;
  font-size: 3em;

text-shadow:  3px 3px 3px #be0606;
             /* color: var(--color-text); */
  color: white;
  font-family: 'Press Start 2P', cursive;
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

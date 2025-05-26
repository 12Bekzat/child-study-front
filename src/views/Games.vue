<template>
  <div class="splitter">
    <div class="splitter-first">
      <div class="game" v-for="image in images">
        <img :src="image" alt="" />
      </div>
    </div>
    <div class="splitter-second">
      <p>Ойындар өтті</p>
      <ProgressBar :value="50"></ProgressBar>
      <p style="margin: 10px 0 0;">Қаншалықты өтті</p>
      <Rating v-model="rationg" readonly />
    </div>
  </div>
</template>
<script setup>
import { ProgressBar, Rating, Splitter, SplitterPanel } from 'primevue';
import { ref } from 'vue';
import Game1 from '@assets/game1.png'
import Game2 from '@assets/game2.png'
import Game3 from '@assets/game3.png'

const images = [Game1, Game2, Game3]


const rationg = ref(4)
</script>

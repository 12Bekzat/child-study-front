<template>
  <div class="splitter">
    <div class="splitter-first">
      <div class="game" v-for="image, ind in images">
        <img :src="image" alt="" @click="pushToGame(ind)"/>
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
import { useGameStore } from '@/stores/gameStore';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/mainStore';
import { useRouter } from 'vue-router';

const images = [Game1, Game2, Game3]

const gameStore = useGameStore()
const store = useMainStore()
const { activeGame } = storeToRefs(store)
const { level, passed, history } = storeToRefs(gameStore)
const router = useRouter()

const rationg = ref(4)

const pushToGame = (ind) => {
  activeGame.value = ind

  const currentGame = history.value.find(item => item?.activeGame === ind)
  if (currentGame) {
    level.value = currentGame?.level || 0
    passed.value = currentGame?.passed || 0
  }
  
  router.push({ name: 'PlayGame' })
}
</script>

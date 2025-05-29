<template>
  <div class="header-info">
    <p>Сіз өттіңіз</p>
    <input style="--base: #8cc8e4;" :value="progress" max="100" min="1" class="kawaii" type="range" disabled/>
  </div>
  <div class="splitter">
    <div class="splitter-first">
      <div class="game" v-for="image, ind in images">
        <img :src="image" alt="" @click="pushToGame(ind)" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ProgressBar, Rating, Splitter, SplitterPanel } from 'primevue';
import { onMounted, ref } from 'vue';
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

const progress = ref(50)

onMounted(() => {
  const passeds = history.value.map(item => item?.passed)

  let allPass = 0

  passeds.forEach(item => {
    allPass += item
  })

  progress.value = (allPass * 100) / 9  
})

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

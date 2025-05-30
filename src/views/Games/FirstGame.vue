<template>
    <div class="play">
        <div class="play__manage">
            <img :src="Game1" alt="" class="play__logo">
            <div class="play__list">
                <button class="play__button" @click="visibleStart = true">Ойнау</button>
                <button class="play__button" @click="visibleSettings = true">Параметрлер</button>
                <button class="play__button" @click="clickToStop">Шығу</button>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="visibleSettings" modal draggable="false" header="Параметрлер">
        <div class="sett-modal">
            <label class="slider">
                <input type="range" class="level" v-model="volume" min="0" max="1" step="0.01">
                <i :class="'pi ' + (volume > 0 ? 'pi-volume-up' : 'pi-volume-off')"
                    @click="volume = volume ? 0 : 1"></i>
            </label>
        </div>
    </Dialog>
    <Dialog v-model:visible="visibleStart" modal draggable="false" header="Бастау">
        <Level @click-game="clickGame" />
    </Dialog>
    <Dialog v-model:visible="visibleWin" modal draggable="false" header="Бастау">
        <div class="win">
            <img :src="WinImage" alt="">
        </div>
    </Dialog>
    <FirstGamePlay v-if="visibleGame" v-model="visibleGame" />
</template>
<script setup>
import { useGameStore } from '@/stores/gameStore';
import Game1 from '@assets/game1.png'
import { storeToRefs } from 'pinia';
import { Dialog } from 'primevue';
import { onMounted, ref, watch } from 'vue';
import Music from '@assets/first-game-music.mp3'
import SmallWin from '@assets/small-win.wav'
import BigWin from '@assets/big-win.wav'
import { useRouter } from 'vue-router';
import FirstGamePlay from './FirstGamePlay.vue';
import WinImage from '@assets/win.png';
import Level from './Level.vue';

const gameStore = useGameStore()
const { levels, level, passed } = storeToRefs(gameStore)

const audio = new Audio(Music)
const smallWin = new Audio(SmallWin)
const bigWin = new Audio(BigWin)
const volume = ref(0.5)
const visibleWin = ref(false)
const router = useRouter()

onMounted(() => {
    level.value = 0
    levels.value = [
        ['apple', 'house', 'mouse', 'water', 'table', 'plane'],
        ['animal', 'doctor', 'pencil', 'school', 'window', 'garden'],
        'prize',
        ['village', 'travel', 'engine', 'pocket', 'weather', 'message'],
    ]
    audio.loop = true
    changeVolume()
})

const changeVolume = () => {
    audio.volume = volume.value
    smallWin.volume = volume.value
    bigWin.volume = volume.value
}

const tryPlay = () => {
    visibleGame.value = true
    audio.play()
}

watch(passed, () => {
    audio.pause()
    if (passed.value !== 4) {
        smallWin.play()
    } else {
        bigWin.play()
    }
    visibleWin.value = true
})

const clickGame = (lvl) => {
    console.log('lvl', lvl)
    if (lvl > passed.value) return
    level.value = lvl
    visibleStart.value = false
    tryPlay()
}

watch(volume, (newVal) => {
    changeVolume()
})

const clickToStop = () => {
    audio.pause()
    router.push({ name: 'Games' })
}

const visibleSettings = ref(false)
const visibleStart = ref(false)
const visibleGame = ref(false)
</script>
<template>
    <div class="play">
        <div class="play__manage">
            <img :src="Game2" alt="" class="play__logo" style="">
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
    <SecondGamePlay v-if="visibleGame" v-model="visibleGame" />
</template>
<script setup>
import { useGameStore } from '@/stores/gameStore';
import Game2 from '@assets/game2.png'
import { storeToRefs } from 'pinia';
import { Dialog } from 'primevue';
import { onMounted, ref, watch } from 'vue';
import Music from '@assets/first-game-music.mp3'
import SmallWin from '@assets/small-win.wav'
import BigWin from '@assets/big-win.wav'
import { useRouter } from 'vue-router';
import SecondGamePlay from './SecondGamePlay.vue';
import WinImage from '@assets/win.png';
import Level from './Level.vue';

const gameStore = useGameStore()
const { levels, level, passed, history } = storeToRefs(gameStore)

const audio = new Audio(Music)
const smallWin = new Audio(SmallWin)
const bigWin = new Audio(BigWin)
const volume = ref(0.5)
const visibleWin = ref(false)
const router = useRouter()

const words = {
    'easy': [
        'apple', 'book', 'house', 'car', 'chair', 'table', 'dog', 'cat', 'pen', 'school',
        'water', 'bag', 'sun', 'milk', 'friend',
    ],
    'medium': [
        'window', 'teacher', 'animal', 'garden', 'pizza', 'juice', 'computer', 'picture', 'market', 'family',
        'party', 'city', 'music', 'bread', 'letter', 'flower', 'river', 'story', 'holiday', 'phone',
    ],
    'hard': [
        'journey', 'engine', 'message', 'weather', 'village', 'artist', 'station', 'language', 'library', 'pocket',
        'meeting', 'answer', 'subject', 'problem', 'bottle'
    ]
}

function getRandomWords(array, count = 5) {
    const shuffled = array.slice().sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
}

onMounted(() => {
    const currentGame = history.value.find(item => item?.activeGame === 1)
    level.value = currentGame?.level || 0
    passed.value = currentGame?.passed || 0
    const easyLevel = getRandomWords(words.easy)
    const mediumLevel = getRandomWords(words.medium)
    const hardLevel = getRandomWords(words.hard)
    levels.value = [
        easyLevel,
        mediumLevel,
        'prize',
        hardLevel,
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
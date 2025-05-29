<template>
    <div class="close">
        <button class="play__button" @click="backToMenu">
            <i class="pi pi-times"></i>
        </button>
    </div>
    <div class="timer">
        {{ getTimer() }}
    </div>
    <div class="second-game">
        <img class="second-game__bg" :src="Bg" />
        <div class="desk">
            <div class="desk__tag" v-for="tag, ind in blocks" @click="checkVariant(tag)">
                <img :src="getImage(tag)" alt="">
                <i class="pi pi-star-fill star" v-if="answers.slice(0, current).includes(tag)"></i>
            </div>
        </div>
        <div class="target">
            {{ answers[current] }}
        </div>
    </div>
</template>
<script setup>
import Bg from '@assets/bg1.png'
import SmallWin from '@assets/small-win.wav'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'
import { ref, reactive, onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'

const images = import.meta.glob('@/assets/first-game/*.png', { eager: true, import: 'default' })
const getImage = (name) => images[`/src/assets/first-game/${name}.png`] // динамически

const visible = defineModel()

const store = useMainStore()
const { activeGame } = storeToRefs(store)
const gameStore = useGameStore()
const { level, levels, passed, lose, history } = storeToRefs(gameStore)

const seconds = ref(120)
const current = ref(0)
const answers = ref([])

const getTimer = () => {
    const minute = parseInt(seconds.value / 60)
    const sec = seconds.value % 60
    return `${minute < 10 ? '0' + minute : minute}:${sec < 10 ? '0' + sec : sec}`
}

let blocks = ref([])

function shuffleArray(arr) {
    return arr
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item)
}

const timer = ref()

onMounted(() => {
    if (levels.value[level.value] === 'prize') {
        winLevel()
    }

    const removeTimer = () => {
        if (!timer.value) return
        clearTimeout(timer.value)

        if (seconds.value > 0) {
            seconds.value -= 1
            timer.value = setTimeout(removeTimer, 1000)
        } else {
            loseLevel()
        }
    }

    timer.value = setTimeout(removeTimer, 1000)


    blocks.value = shuffleArray(levels.value[level.value])
    answers.value = shuffleArray(blocks.value)
    console.log(blocks.value, current.value);
})

const winLevel = () => {
    if (timer.value) clearTimeout(timer.value)
    visible.value = false
    level.value += 1
    passed.value = level.value

    const currentGame = history.value.find(item => item?.activeGame === activeGame.value)
    if (currentGame) {
        history.value = [
            ...history.value.filter(item => item?.activeGame !== activeGame.value), {
                activeGame: activeGame.value, level: level.value, passed: passed.value
            }
        ]
    } else {
        history.value.push({
            activeGame: activeGame.value, level: level.value, passed: passed.value
        })
    }
}

const loseLevel = () => {
    clearTimeout(timer.value)
    visible.value = false
    lose.value = true
}

const checkVariant = (block) => {
    const ans = answers.value[current.value] === block

    if (ans) {
        current.value += 1

        if (current.value === blocks.value.length) {
            winLevel()
        }
    } else {
        seconds.value -= 5
    }
}

const backToMenu = () => {
    visible.value = false
    loseLevel()
}
</script>
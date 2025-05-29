<template>
    <div class="close">
        <button class="play__button" @click="backToMenu">
            <i class="pi pi-times"></i>
        </button>
        <button class="play__button" @click="restart">
            <i class="pi pi-refresh"></i>
        </button>
    </div>
    <div class="second-game">
        <img class="second-game__bg" :src="Bg" />
        <div class="board">
            <!-- Зона сбора -->
            <div class="dropzone" ref="dropzone">
            </div>

            <!-- Перетаскиваемые квадраты -->
            <div v-for="(block, index) in blocks" :key="index" class="block"
                :style="{ left: block.x + 'px', top: block.y + 'px', backgroundColor: block.collected ? 'cornflowerblue' : 'crimson' }"
                @mousedown="startDrag(index, $event)">
                {{ block?.letter }}
            </div>
        </div>
    </div>
</template>
<script setup>
import Bg from '@assets/bg1.png'
import SmallWin from '@assets/small-win.wav'
import { useGameStore } from '@/stores/gameStore'
import { storeToRefs } from 'pinia'
import { ref, reactive, onMounted } from 'vue'

const visible = defineModel()

const gameStore = useGameStore()
const { level, levels, passed } = storeToRefs(gameStore)

let blocks = ref([])

function shuffleLetterArray(words) {
    const letters = words.join('').split('')

    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]]
    }

    return letters
}

onMounted(() => {
    if (levels.value[level.value] === 'prize') {
        winLevel()
    }
    
    const shuffledArray = shuffleLetterArray(levels.value[level.value])

    shuffledArray?.forEach((letter, ind) => {
        const startX = 60
        const startY = 60
        const count = 5
        const x = (startX * (ind % count)) + 50
        const y = (startY * parseInt(ind / count)) + 50
        blocks.value.push({ x, y, letter, collected: false })
    })

    console.log('blocks', blocks.value)
})

const restart = () => {
    blocks.value = blocks.value.map((block, ind) => {
        const startX = 60
        const startY = 60
        const count = 5
        const x = (startX * (ind % count)) + 50
        const y = (startY * parseInt(ind / count)) + 50
        return { x, y, letter: block?.letter, collected: false }
    })
}

const dropzone = ref(null)
let activeIndex = null
let offsetX = 0
const smallWin = new Audio(SmallWin)
let offsetY = 0

const startDrag = (index, event) => {
    activeIndex = index
    offsetX = event.clientX - blocks.value[index].x
    offsetY = event.clientY - blocks.value[index].y

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', endDrag)
}

const onDrag = (event) => {
    if (activeIndex === null) return

    blocks.value[activeIndex].x = event.clientX - offsetX
    blocks.value[activeIndex].y = event.clientY - offsetY
}

const endDrag = () => {
    if (activeIndex === null) return

    const zone = dropzone.value.getBoundingClientRect()
    const block = blocks.value[activeIndex]

    // Проверка попадания в drop-зону
    if (
        block.x > (zone.left - 100) &&
        block.x < (zone.right + 100) - 50 &&
        block.y > (zone.top - 50) &&
        block.y < (zone.bottom) - 100
    ) {
        block.collected = true
    } else {
        block.collected = false
    }

    const result = blocks.value.filter(item => item?.collected).sort((a, b) => a.x - b.x).map(item => item?.letter).join('')

    console.log('result', result)

    if (result != '') {
        const words = levels.value[level.value]
        if (words.includes(result)) {
            blocks.value = blocks.value.filter(item => !item?.collected)
            smallWin.play()

            if (blocks.value.length <= 0) {
                winLevel()
            }
        }
    }

    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', endDrag)
    activeIndex = null
}

const winLevel = () => {
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

const backToMenu = () => {
    visible.value = false
}
</script>
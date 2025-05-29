<template>
    <div class="levels">
        <div class="levels__bg">
            <img :src="Path" alt="">
        </div>

        <button :class="'play__button ' + (passed < 0 ? 'disabled' : '')" style="top: 10%; left: 55%;"
            @click="clickGame(0)">
            <i class="pi pi-star-fill">
            </i>
        </button>
        <button :class="'play__button ' + (passed < 1 ? 'disabled' : '')" style="top: 35%; left: 40%;"
            @click="clickGame(1)">
            <i class="pi pi-star-fill">
            </i>
        </button>
        <button :class="'play__button ' + (passed < 2 ? 'disabled' : ' golden')" style="top: 55%; left: 30%;"
            @click="clickGame(2)">
            <i class="pi pi-money-bill">
            </i>
        </button>
        <button :class="'play__button ' + (passed < 3 ? 'disabled' : '')" style="top: 70%; left: 40%;"
            @click="clickGame(3)">
            <i class="pi pi-crown">
            </i>
        </button>
    </div>
</template>
<script setup>
import { useGameStore } from '@/stores/gameStore';
import Path from '@assets/path.png'

const { passed, level, levels } = useGameStore()

const emit = defineEmits(['clickGame'])

const clickGame = (lvl) => {
    emit('clickGame', lvl)
}
</script>
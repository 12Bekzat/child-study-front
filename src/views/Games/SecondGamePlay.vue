<template>
    <div class="close">
        <button class="play__button" @click="backToMenu">
            <i class="pi pi-times"></i>
        </button>
    </div>
    <div class="second-game">
        <img class="second-game__bg" :src="Bg" />
       <Draggable />
    </div>
</template>
<script setup>
import Bg from '@assets/bg1.png'
import Draggable from './Draggable.vue'

const visible = defineModel()


const backToMenu = () => {
    visible.value = false
}
</script>
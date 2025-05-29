<template>
    <FirstGame v-if="activeGame === 0" />
    <SecondGame v-if="activeGame === 1" />
    <ThirdGame v-if="activeGame === 2" />
</template>
<script setup>
import { useMainStore } from '@/stores/mainStore';
import { storeToRefs } from 'pinia';
import FirstGame from './Games/FirstGame.vue';
import SecondGame from './Games/SecondGame.vue';
import ThirdGame from './Games/ThirdGame.vue';

const store = useMainStore()
const { activeGame } = storeToRefs(store)

</script>
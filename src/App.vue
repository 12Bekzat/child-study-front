<script setup>
import { updatePrimaryPalette } from '@primevue/themes';
import AppEventBus from './app/AppEventBus';
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import { useMainStore } from './stores/mainStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import Footer from './components/Footer.vue';

const store = useMainStore()
const { currentUser } = storeToRefs(store)

const route = useRoute();

onMounted(() => {
  console.log(currentUser.value);
  
  const color = {
    name: "cornflowerblue",
    palette: {
      50: "#eef4ff",
      100: "#dbe4ff",
      200: "#b7c9ff",
      300: "#8daeff",
      400: "#6495ed", // основной cornflowerblue
      500: "#4a7dd6",
      600: "#3b66b5",
      700: "#2f5193",
      800: "#273f73",
      900: "#1f325a",
      950: "#0e1a33",
    },
  };

  updatePrimaryPalette(color.palette)
  AppEventBus.emit('theme-palette-change')
});

const formUrls = ['login', 'register']
</script>

<template>
  <Header v-if="formUrls.filter(url => route.path.includes(url.toLowerCase())).length <= 0"/>

  <div class="main" v-if="formUrls.filter(url => route.path.includes(url.toLowerCase())).length <= 0">
    <RouterView />
  </div>
  <div class="form-main" v-else>
    <RouterView />
  </div>

  <Footer v-if="formUrls.filter(url => route.path.includes(url.toLowerCase())).length <= 0"/>
</template>


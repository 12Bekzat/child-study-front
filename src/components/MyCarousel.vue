<template>
  <Carousel
    :value="products"
    :numVisible="1"
    :numScroll="1"
    :responsive-options="responsiveOptions"
    circular
    :autoplayInterval="3000"
  >
    <template #item="slotProps" style="width: 100%;">
      <div class="block">
        <img src="https://cdn.prod.website-files.com/599873abab717100012c91ea/676461a0f39060b416ff9c63_970cdcfe6281a050ccace07a294389d9.png" alt="">
      </div>
    </template>
  </Carousel>
</template>

<script setup>
import { ref } from "vue";
import { Carousel } from "primevue";

const products = ref([
    {},
    {},
    {},
]);

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

</script>

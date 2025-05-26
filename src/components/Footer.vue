<template>
  <footer>
    <div class="footer-container">
      <!-- Верхняя часть -->
      <div class="footer-top">
        <!-- Логотип -->
        <div class="footer-logo">
          <span>CHILD-STUDY</span>
        </div>

        <!-- Ссылки -->
        <div class="footer-links">
          <RouterLink :to="link.to" v-for="link in items">{{
            link.label
          }}</RouterLink>
        </div>
      </div>

      <!-- Копирайт -->
      <div class="footer-bottom">
        © {{ new Date().getFullYear() }} child-study. Барлық құқықтар қорғалған.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const items = ref([
  {
    label: "Басты бет",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "Сабақтар",
    icon: "pi pi-search",
    to: "/lessons",
  },
  {
    label: "Ойындар",
    icon: "pi pi-search",
    to: "/games",
  },
  {
    label: "Тапсырмалар",
    icon: "pi pi-search",
    to: "/tasks",
  },
]);
</script>

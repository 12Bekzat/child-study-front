<template>
  <div class="close">
    <button class="play__button" @click="backToMenu">
      <i class="pi pi-times"></i>
    </button>
  </div>
  <div :class="'first-game'">
    <img class="first-game__bg" :src="Bg" />
    <div class="first-game__menu">
      <div
        class="first-game__tag"
        v-for="(_, ind) in new Array(currentWord + 1).fill(0)"
      >
        <img :src="getImage(allWords[ind])" alt="" />
        <i class="pi pi-star-fill star" v-if="ind < currentWord"></i>
      </div>
    </div>
    <div class="first-game__tab">
      <div class="slot">
        <div class="slot__top">
          <div
            v-if="allWords.length > 0"
            class="slot__place"
            v-for="(s, ind) in allWords[currentWord].length"
            :style="{ top: ind > 4 ? '58px' : 0, left: (ind % 5) * 66 + 'px' }"
          ></div>
          <div
            v-if="generatedLetters.length > 0"
            class="slot__let"
            v-for="(lett, index) in generatedLetters"
            :style="getPosition(lett, index)"
            @click="moveLetter(lett, index)"
          >
            {{ lett }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGameStore } from "@/stores/gameStore";
import { useMainStore } from "@/stores/mainStore";
import Bg from "@assets/bg1.png";
import Music from "@assets/first-game-music.mp3";
import SmallWin from "@assets/small-win.wav";
import BigWin from "@assets/big-win.wav";
import WinImage from "@assets/win.png";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { Dialog } from "primevue";
import { useQueries } from "@/composables/useQueries";

const images = import.meta.glob("@/assets/first-game/*.png", {
  eager: true,
  import: "default",
});
const currentWord = ref(0);

const audio = new Audio(Music);
const smallWin = new Audio(SmallWin);
const bigWin = new Audio(BigWin);

const store = useMainStore();
const gameStore = useGameStore();
const { level, levels, passed, history } = storeToRefs(gameStore);
const { activeGame, currentUser } = storeToRefs(store);

const { create } = useQueries();

const allWords = ref([]);

const getImage = (name) => images[`/src/assets/first-game/${name}.png`]; // динамически
const generatedLetters = ref([]);
const answer = ref([]);
const visibleWin = ref(false);

onMounted(() => {
  console.log("levels.value[level.value]", levels.value[level.value]);
  if (levels.value[level.value] === "prize") {
    winLevel();
  }
  allWords.value = [...levels.value[level.value]];
  startGame();
});

const visible = defineModel();

watch(
  () => answer.value.length,
  (newVal, oldVal) => {
    console.log("change answer", answer.value);
  }
);

const getPosition = (lett, index) => {
  for (let i = 0; i < answer.value.length; i++) {
    const item = answer.value[i];
    if (item?.letter === lett && item?.index === index) {
      return { top: i > 4 ? "58px" : 0, left: (i % 5) * 66 + "px" };
    }
  }

  return { top: index > 4 ? "182px" : "124px", left: (index % 5) * 66 + "px" };
};

const moveLetter = (letter, index) => {
  if (
    answer.value.find((item) => item.letter === letter && item.index === index)
  ) {
    answer.value.splice(answer.value.length - 1, 1);
    return;
  }
  answer.value.push({
    letter,
    index,
  });

  if (answer.value.length === allWords.value[currentWord.value]?.length) {
    const result = answer.value.map((item) => item.letter).join("");
    console.log("result", result);
    if (
      result.toLowerCase() === allWords.value[currentWord.value].toLowerCase()
    ) {
      currentWord.value += 1;

      if (currentWord.value === allWords.value.length) {
        currentWord.value = 0;
        answer.value = [];
        winLevel();
        return;
      }
      startGame();
    }
    answer.value = [];
    return;
  }
};

const winLevel = async () => {
  visible.value = false;
  level.value += 1;
  passed.value = level.value;

  const currentGame = history.value.find(
    (item) => item?.activeGame === activeGame.value
  );
  if (currentGame) {
    history.value = [
      ...history.value.filter((item) => item?.activeGame !== activeGame.value),
      {
        activeGame: activeGame.value,
        level: level.value,
        passed: passed.value,
      },
    ];
  } else {
    history.value.push({
      activeGame: activeGame.value,
      level: level.value,
      passed: passed.value,
    });
  }

  if (currentUser.value) {
    try {
      let item = {
        name: "Жұлдызша",
        count: 5,
        userId: currentUser.value?.id,
      };
      await create({ item, serviceName: "reward" });
      item = {
        name: "Алмас",
        count: 5,
        userId: currentUser.value?.id,
      };
      await create({ item, serviceName: "reward" });
      item = {
        name: "Алтын белгі",
        count: 5,
        userId: currentUser.value?.id,
      };
      await create({ item, serviceName: "reward" });
      item = {
        name: "Күміс теңге",
        count: 5,
        userId: currentUser.value?.id,
      };
      await create({ item, serviceName: "reward" });
    } catch {}
  }
};

const backToMenu = () => {
  currentWord.value = 0;
  answer.value = [];
  visible.value = false;
};

const startGame = () => {
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const totalCount = 10; // итоговое количество букв

  function generateLetters() {
    console.log(
      "allWords.value[currentWord.value]",
      allWords.value[currentWord.value]
    );

    const letters =
      allWords.value.length > 0
        ? [...allWords.value[currentWord.value].toUpperCase()]
        : []; // включаем все буквы слова (с дубликатами)

    while (letters.length < totalCount) {
      const randomLetter =
        allLetters[Math.floor(Math.random() * allLetters.length)];
      letters.push(randomLetter);
    }

    // Перемешиваем
    generatedLetters.value = shuffleArray(letters);
  }

  function shuffleArray(arr) {
    return arr
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  // Генерация при загрузке
  generateLetters();
};
</script>

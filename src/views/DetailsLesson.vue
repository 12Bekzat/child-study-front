<template>
  <div
    class="flex"
    style="
      width: 80%;
      object-fit: cover;
      height: 600px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <img
      :src="Banner"
      style="
        width: 100%;
        object-fit: cover;
        height: 100%;
        filter: brightness(0.5);
      "
    />
    <div
      class="text"
      style="
        position: absolute;
        color: white;
        font-size: 64px;
        align-items: center;
        justify-content: center;
        text-align: center;
      "
    >
      Балаларға арналған ағылшын тілі: Бастауыш деңгей
    </div>
  </div>
  <div class="lessons">
    <div class="lessons__item" v-for="(lesson, ind) in lessons">
      <div class="lessons__number">#{{ ind + 1 }}</div>
      <div class="lessons__title">{{ lesson?.title }}</div>
      <div class="lessons__manage">
        <Tag
          v-model="checked"
          style="white-space: nowrap"
        >{{ item?.review ? 'Өтті' : 'Өткен жоқ' }}</Tag>
        <Button
          label="Өту"
          @click="
            () => {
              activeLesson = lesson;
              $router.push({ name: 'DetailsOneLesson' });
            }
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import Banner from "@assets/banner.png";
import { storeToRefs } from "pinia";
import { Button, Tag, ToggleButton } from "primevue";
import { onMounted, ref } from "vue";

const store = useMainStore();
const { activeCourse, activeLesson, currentUser } = storeToRefs(store);
const { getPaged } = useQueries();
const lessons = ref([]);

const get = async () => {
  lessons.value = await getPaged({ serviceName: "lesson" });

  const extra = currentUser.value?.extra ? JSON.parse(currentUser.value?.extra) : {};

  console.log('extra', extra);
  
  lessons.value = lessons.value
    .filter((less) => {
      return less.courseId === activeCourse.value?.id;
    })
    .map((item) => {
      if (extra && extra?.reviewLessons?.length > 0) {
        extra.reviewLessons.find((rles) => rles?.id === item?.id);
        item.review = true;
      }

      return item;
    });
    console.log(lessons.value);
    
};

onMounted(async () => {
  await get();
  console.log(lessons.value);
  console.log(activeCourse.value);
});
</script>

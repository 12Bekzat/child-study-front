<template>
  <MyCarousel />

  <div class="cards">
    <Card style="width: 25rem; overflow: hidden" v-for="course in courses"
    :pt="{
        content: {
            style: {
                'flex-grow': '1'
            }
        }
    }">
      <template #header>
        <img
          alt="user header"
          :src="getImg(course?.preview)"
          style="object-fit: cover; width: 100%"
        />
      </template>
      <template #title>{{ course.title }}</template>
      <template #content>
        <p class="m-0" style="flex-grow: 1;">
            {{ course.description }}
        </p>
      </template>
    </Card>
  </div>
</template>
<script setup>
import MyCarousel from "@/components/MyCarousel.vue";
import { Button, Card } from "primevue";
import { onMounted, ref } from "vue";
import { useQueries } from "@/composables/useQueries";
import firstImg from "@assets/eng-start.png";
import secondImg from "@assets/eng-mid.png";
import thirdImg from "@assets/eng-adv.png";

const courses = ref([])

const { getPaged } = useQueries()

const getCourses = async () => {
  courses.value = await getPaged({ serviceName: 'course' })
}

const getImg = (num) => {
  if (num == null) return thirdImg
  const arr = [firstImg, secondImg, thirdImg]

  return arr[num]
}

onMounted(async () => {
  await getCourses()
})
</script>

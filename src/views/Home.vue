<template>
  <div class="banner">
    <div class="banner__item">
      <div class="banner__img">
        <img :src="Banner1" alt="">
      </div>
      <div class="banner__text">
        <h1>Біз ағылшын тілін үйренеміз-ойнаймыз және жеңеміз!</h1>
        <p>Балаңызбен бірге ағылшын әріптері мен сөздерін қызықты ойындар арқылы үйреніңіз. Әр сабақ — бұл қызыққа толы саяхат!</p>
      </div>
    </div>
    <div class="banner__item">
      <div class="banner__text">
        <h1>Жаңа сөздерді ашып, сыйақы жинаңыз!</h1>
        <p>Балаларға арналған қызықты тапсырмалар мен көңілді кейіпкерлермен бірге ағылшын тілін оңай меңгеріңіз!</p>
      </div>
      <div class="banner__img">
        <img :src="Banner2" alt="">
      </div>
    </div>
    <div class="banner__item">
      <div class="banner__img">
        <img :src="Banner3" alt="">
      </div>
      <div class="banner__text">
        <h1>Біз оқуды жақсы көруге көмектесеміз — қызығушылықпен және прогреспен!</h1>
        <p>Балаларға арналған қызықты тапсырмалар мен көңілді кейіпкерлермен бірге ағылшын тілін оңай меңгеріңіз!</p>
      </div>
    </div>
  </div>

  <div class="helper">
    <div class="helper__logo logo">CHILD-STUDY</div>
    <div class="helper__title">
      Бізбен бірге оқыңыз
    </div>
    <div class="link" @click="$router.push({ name: 'Lesson' })">
      Бастау
    </div>

    <div class="helper__img">
      <img :src="Helper" alt="">
    </div>
  </div>

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
import Banner1 from "@assets/banner1.png";
import Banner2 from "@assets/banner2.png";
import Banner3 from "@assets/banner3.png";
import Helper from "@assets/helper.png";

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

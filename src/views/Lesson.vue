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
        filter: brightness(0.7);
      "
    />
    <div class="text" style="position: absolute; color: white; font-size: 64px">
      Сабақтар
    </div>
  </div>

  <p style="width: 90%; margin: 50px 0 20px; padding: 18px">Менің сабақтарым</p>
  <div class="flex" style="width: 90%; padding: 0 18px">
    <IconField>
      <InputIcon class="pi pi-search" v-model="search"/>
      <InputText v-model="search" placeholder="Іздеу" />
    </IconField>
    <Button icon="pi pi-filter" aria-label="Save" />
    <Button
      label="Курс құру"
      v-if="isAdmin()"
      @click="$router.push({ name: 'CreateCourse' })"
    />
  </div>
  <Accordion value="0" style="width: 90%; margin: 20px 0 50px">
    <AccordionPanel value="0" v-for="course in courses">
      <AccordionHeader style="display: flex; gap: 16px">
        <p style="flex-grow: 1">
          {{ course?.title }}
        </p>
      </AccordionHeader>
      <AccordionContent style="gap: 12px">
        <div
          class="flex"
          style="
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          "
        >
          <p class="m-0">
            {{ course?.description}}
          </p>
          <Button
            label="Курсқа өту"
            v-if="!isAdmin('ROLE_PARENT')"
            class="w-full"
            @click="() => {
              activeCourse = course
              $router.push({ name: 'DetailsLesson' })
            }"
          />
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import Banner from "@assets/banner.png";
import { storeToRefs } from "pinia";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Button,
  IconField,
  InputIcon,
  InputText,
  Knob,
} from "primevue";
import { onMounted, ref, watch } from "vue";


const store = useMainStore();
const { currentUser, activeCourse } = storeToRefs(store);

const { getPaged } = useQueries()
const courses = ref([])

const isAdmin = (roleN = 'ROLE_ADMIN') => {
  const roles = currentUser.value?.roles;

  return roles?.length > 0
    ? roles.find((role) => role.name === roleN)
    : false;
};

const getCourses = async () => {
  const extra = currentUser.value?.extra
  courses.value = await getPaged({ serviceName: 'course' })
}

onMounted(async () => {
  await getCourses()
})

const search = ref("");

const percent = ref(80);

watch(search, async () => {
  await getCourses()
  courses.value = courses.value.filter(course => course.title.toLowerCase().includes(search.value))
})
</script>

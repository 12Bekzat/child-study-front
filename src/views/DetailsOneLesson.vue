<template>
  <div class="one-lesson">
    <div class="one-lesson__video">
      <iframe :src="activeLesson?.videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="one-lesson__details">
      {{ activeLesson?.description }}
    </div>
    <div class="one-lesson__manage" v-if="!isReview()">
      <Button label="Өту" :disabled="!isAdmin()" @click="setReview"/>
    </div>
  </div>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import { Button } from "primevue";
import { onMounted, ref } from "vue";

const store = useMainStore()
const { activeLesson, currentUser } = storeToRefs(store)

const { create, getPaged } = useQueries()
const reviews = ref([])

const isAdmin = () => {
  const roles = currentUser.value?.roles;

  return roles?.length > 0
    ? roles.find((role) => role.name === "ROLE_CHILD")
    : false;
};

const isReview = () => {
  return reviews.value.find(item => item?.userId === currentUser?.value?.id && item?.lessonId === activeLesson.value?.id)
}

const getReviews = async () => {
  reviews.value = await getPaged({ serviceName: 'reviews' })
  reviews.value = reviews.value.filter(item => {
    return item?.userId === currentUser?.value?.id && item?.lessonId === activeLesson.value?.id
  })
}

onMounted(async () => {
  await getReviews()
})

const setReview = async () => {
    const item = {
        userId: currentUser.value?.id,
        lessonId: activeLesson.value?.id
    }

    try {
      const ans = await create({ item, serviceName: 'reviews' })
    } catch (error) {}

    await getReviews()
}
</script>

<template>
  <div class="one-lesson">
    <div class="one-lesson__video">
      <iframe :src="activeLesson?.videoUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="one-lesson__details">
      {{ activeLesson?.description }}
    </div>
    <div class="one-lesson__manage">
      <Button label="Өту" :disabled="!isAdmin()" @click="setReview"/>
    </div>
  </div>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import { Button } from "primevue";

const store = useMainStore()
const { activeLesson, currentUser } = storeToRefs(store)

const { update, getMe } = useQueries()

const isAdmin = () => {
  const roles = currentUser.value?.roles;

  return roles?.length > 0
    ? roles.find((role) => role.name === "ROLE_CHILD")
    : false;
};

const setReview = async () => {
    const oldExtra = currentUser.value?.extra ? JSON.parse(currentUser.value?.extra) : {}

    
    if(!oldExtra?.reviewLessons) {
        oldExtra.reviewLessons = [activeLesson.value]
    } else {
        oldExtra.reviewLessons.push(activeLesson.value)
    }

    const item = {
        id: currentUser.value?.id,
        userDto: {
            extra: JSON.stringify(oldExtra)
        } 
    }
    debugger

    try {
      const ans = await update({ item, serviceName: 'users' })
    } catch (error) {}
    
    await getMe()
}
</script>

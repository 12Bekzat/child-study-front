import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const currentUser = ref(null)
  const activeCourse = ref(null)
  const activeLesson = ref(null)

  return { currentUser, activeCourse, activeLesson }
}, {
  persist: true, // Включаем сохранение в localStorage
})

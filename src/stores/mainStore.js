import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const currentUser = ref(null)
  const activeCourse = ref(null)
  const activeLesson = ref(null)
  const activeGame = ref(0)
  const activeTest = ref({})
  const play = ref(false)

  return { currentUser, activeCourse, activeLesson, activeGame, play, activeTest }
}, {
  persist: true, // Включаем сохранение в localStorage
})

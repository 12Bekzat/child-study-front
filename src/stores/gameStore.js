import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('gameStore', () => {
  const level = ref(0)
  const levels = ref([])
  const passed = ref(0)
  const history = ref([])
  const lose = ref(false)

  return { level, levels, passed, history, lose }
}, {
  persist: true, // Включаем сохранение в localStorage
})

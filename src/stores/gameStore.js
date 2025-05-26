import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('gameStore', () => {
  const level = ref(0)
  const levels = ref([])
  const passed = ref(0)
  const history = ref([])

  return { level, levels, passed, history }
}, {
  persist: true, // Включаем сохранение в localStorage
})

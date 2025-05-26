<template>
  <div class="board">
    <!-- Зона сбора -->
    <div class="dropzone" ref="dropzone">
      Сборка
    </div>

    <!-- Перетаскиваемые квадраты -->
    <div
      v-for="(block, index) in blocks"
      :key="index"
      class="block"
      :style="{ left: block.x + 'px', top: block.y + 'px', backgroundColor: block.collected ? 'green' : block.color }"
      @mousedown="startDrag(index, $event)"
    >
      {{ index + 1 }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const blocks = reactive([
  { x: 50, y: 50, color: '#e74c3c', collected: false },
  { x: 150, y: 50, color: '#3498db', collected: false },
  { x: 250, y: 50, color: '#f39c12', collected: false }
])

const dropzone = ref(null)
let activeIndex = null
let offsetX = 0
let offsetY = 0

const startDrag = (index, event) => {
  activeIndex = index
  offsetX = event.clientX - blocks[index].x
  offsetY = event.clientY - blocks[index].y

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', endDrag)
}

const onDrag = (event) => {
  if (activeIndex === null) return

  blocks[activeIndex].x = event.clientX - offsetX
  blocks[activeIndex].y = event.clientY - offsetY
}

const endDrag = () => {
  if (activeIndex === null) return

  const zone = dropzone.value.getBoundingClientRect()
  const block = blocks[activeIndex]

  // Проверка попадания в drop-зону
  if (
    block.x > zone.left &&
    block.x < zone.right - 50 &&
    block.y > zone.top &&
    block.y < zone.bottom - 50
  ) {
    block.collected = true
  }

  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', endDrag)
  activeIndex = null
}
</script>

<style scoped>
.board {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  overflow: hidden;
}

.block {
  position: absolute;
  width: 50px;
  height: 50px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  user-select: none;
  cursor: grab;
  transition: background-color 0.3s;
}

.dropzone {
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 200px;
  height: 200px;
  border: 3px dashed #aaa;
  background-color: #fffbe6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>

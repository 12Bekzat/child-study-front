import { onMounted, onUnmounted, ref } from "vue"

export const useMobile = () => {
    const isMobile = ref(false)

    function checkMobile() {
        isMobile.value = window.innerWidth <= 966 // или 640, 600 — под свой брейкпоинт
    }

    onMounted(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', checkMobile)
    })

    return { isMobile }
}
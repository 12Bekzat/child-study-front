<template>
    <div class="flex" style="
      width: 80%;
      object-fit: cover;
      height: 600px;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    ">
        <img :src="Banner" style="
        width: 100%;
        object-fit: cover;
        height: 100%;
        filter: brightness(0.7);
      " />
        <div class="text" style="position: absolute; color: white; font-size: 64px">
            Тапсырмалар
        </div>
    </div>
    <div class="tests">
        <div class="link" @click="$router.push({ name: 'CreateTests' })" v-if="isAdmin()">Тест жасау</div>
        <div class="tests__item" v-for="test in tests">
            <div class="tests__img">
                <img :src="Star" alt="">
            </div>
            <div class="tests__title">
                {{ test?.title }}
            </div>
            <div class="tests__manage">
                <div class="link" @click="setTest(test)">Өту</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import Banner from "@assets/banner.png";
import Star from "@assets/star.png";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const { getPaged } = useQueries()
const store = useMainStore()
const { activeTest, currentUser } = storeToRefs(store)
const router = useRouter()

const tests = ref([])

const get = async () => {
    tests.value = await getPaged({ serviceName: 'test' })
}

onMounted(async () => {
    await get()
})

const isAdmin = (roleN = 'ROLE_ADMIN') => {
    const roles = currentUser.value?.roles;

    return roles?.length > 0
        ? roles.find((role) => role.name === roleN)
        : false;
};

const setTest = (test) => {
    activeTest.value = {
        ...test,
        questions: JSON.parse(test?.questions)
    }
    router.push({ name: 'TestDetails' })
}
</script>

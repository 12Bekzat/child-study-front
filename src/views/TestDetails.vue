<template>
    <div class="test-detail">
        <div class="test-detail__title">{{ activeTest?.title }}</div>
        <div class="test-detail__item" v-for="quest, ind in activeTest.questions">
            <div class="test-detail__ques">{{ ind + 1 }}. {{ quest?.question }}</div>
            <div class="test-detail__ans">
                 <RadioButton v-model="ans[ind]" inputId="ingredient1" name="pizza" value="1" />
                 <label for="ingredient1">{{ quest?.answer1 }}</label>
            </div>
            <div class="test-detail__ans">
                 <RadioButton v-model="ans[ind]" inputId="ingredient2" name="pizza" value="2" />
                 <label for="ingredient2">{{ quest?.answer2 }}</label>
            </div>
            <div class="test-detail__ans">
                 <RadioButton v-model="ans[ind]" inputId="ingredient3" name="pizza" value="3" />
                 <label for="ingredient3">{{ quest?.answer3 }}</label>
            </div>
            <div class="test-detail__ans">
                 <RadioButton v-model="ans[ind]" inputId="ingredient4" name="pizza" value="4" />
                 <label for="ingredient4">{{ quest?.answer4 }}</label>
            </div>
        </div>
        <div class="test-detail__item">
            <Message v-if="checked" severity="error" variant="simple">Вы набрали {{ correct }}/{{ activeTest?.questions?.length }}</Message>
            <div class="link" @click="check">Тексеру</div>
        </div>
    </div>
</template>
<script setup>
import { useMainStore } from '@/stores/mainStore';
import { storeToRefs } from 'pinia';
import { Checkbox, Message, RadioButton } from 'primevue';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const ans = ref([])

const store = useMainStore()
const { activeTest } = storeToRefs(store)
const router = useRouter()
const correct = ref(0)
const checked = ref(false)

watch(ans, () => {
 console.log('ans', ans.value)
}, { immediate: true    })

onMounted(() => {
    if(!activeTest.value) {
        router.push({ name: 'Tasks' })
    }

    console.log('test', activeTest.value)
})

const check = () => {
    if (checked.value) return
    console.log('dasdda')
    ans.value.forEach((item, ind) => {
        const compareTest = activeTest.value.questions[ind]

        const res = compareTest?.correct === item

        if(res) correct.value += 1
    })
    checked.value = true
}

</script>
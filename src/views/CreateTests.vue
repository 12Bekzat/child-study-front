<template>
     <Card style="max-width: 800px; width: 100%">
          <template #content>
               <Stepper v-model:value="activePanel">
                    <StepList>
                         <Step value="1">Негізгі ақпарат</Step>
                         <Step value="2">Қосымша ақпарат</Step>
                    </StepList>
                    <StepPanels>
                         <StepPanel value="1">
                              <div class="form">
                                   <div class="form__title">Тест құру</div>
                                   <FloatLabel style="width: 100%">
                                        <InputText id="full" v-model="item.title" style="width: 100%" />
                                        <label for="full">Толық аты</label>
                                   </FloatLabel>
                                   <Message v-if="message" severity="error" size="small" variant="simple">{{ message }}
                                   </Message>
                                   <Button type="submit" label="Тіркелу" @click="save" />
                              </div>
                         </StepPanel>
                         <StepPanel value="2">
                              <div class="form">
                                   <div class="lessons">
                                        <div class="lessons__item" v-for="(item, ind) in lessons">
                                             <div class="lessons__number">#{{ ind + 1 }}</div>
                                             <div class="lessons__title">{{ item?.question }}</div>
                                             <div class="lessons__manage">
                                                  <Button icon="pi pi-trash" @click="lessons.splice(ind, 1)" />
                                             </div>
                                        </div>
                                   </div>
                                   <div class="form__title">Сұрақ қосыңыз</div>
                                   <FloatLabel style="width: 100%">
                                        <InputText id="full" v-model="lesson.question" style="width: 100%" />
                                        <label for="full">Сұрақ</label>
                                   </FloatLabel>
                                   <span>
                                        <RadioButton v-model="lesson.correct" name="pizza" value="1" />
                                        <FloatLabel style="width: 100%">
                                             <InputText id="full" v-model="lesson.answer1" style="width: 100%" />
                                             <label for="full">Жауап 1</label>
                                        </FloatLabel>
                                   </span>
                                   <span>
                                        <RadioButton v-model="lesson.correct" name="pizza" value="2" />
                                        <FloatLabel style="width: 100%;">
                                             <InputText id="full" v-model="lesson.answer2" style="width: 100%" />
                                             <label for="full">Жауап 2</label>
                                        </FloatLabel>
                                   </span>
                                   <span>
                                        <RadioButton v-model="lesson.correct" name="pizza" value="3" />
                                        <FloatLabel style="width: 100%">
                                             <InputText id="full" v-model="lesson.answer3" style="width: 100%" />
                                             <label for="full">Жауап 3</label>
                                        </FloatLabel>
                                   </span>
                                   <span>
                                        <RadioButton v-model="lesson.correct" name="pizza" value="4" />
                                        <FloatLabel style="width: 100%">
                                             <InputText id="full" v-model="lesson.answer4" style="width: 100%" />
                                             <label for="full">Жауап 4</label>
                                        </FloatLabel>
                                   </span>

                                   <Button type="submit" label="Тіркелу" @click="createLesson" />
                              </div>
                         </StepPanel>
                    </StepPanels>
               </Stepper>
          </template>
     </Card>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import {
     Button,
     Card,
     FloatLabel,
     InputText,
     Message,
     RadioButton,
     Step,
     StepList,
     StepPanel,
     StepPanels,
     Stepper,
} from "primevue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const ans = ref()
const item = ref({})
const lesson = ref({})
const lessons = ref([])
const activePanel = ref('1')

const createLesson = () => {
     lessons.value.push({ ...lesson.value });
     lesson.value = {}
};

const { getPaged, create, update, remove } = useQueries()
const router = useRouter()
const message = ref('')

const save = async () => {
     if (!item.value?.title || lessons.value.length <= 0) {
          message.value = "Дұрыс ақпаратты енгізіңіз";
          return;
     }

     const newItem = {
          ...item.value,
          questions: JSON.stringify(lessons.value),
          lessonId: -1,
     };

     const ans = await create({ item: newItem, serviceName: "test" });
     if (ans) {
          router.push({ name: "Tasks" });
     }
}

</script>
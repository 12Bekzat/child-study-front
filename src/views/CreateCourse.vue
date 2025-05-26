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
              <div class="form__title">Курс құру</div>
              <FloatLabel style="width: 100%">
                <InputText id="full" v-model="item.title" style="width: 100%" />
                <label for="full">Толық аты</label>
              </FloatLabel>
              <FloatLabel style="width: 100%">
                <Textarea
                  id="username"
                  v-model="item.description"
                  style="width: 100%"
                  rows="5"
                />
                <label for="username">Сипаттама</label>
              </FloatLabel>
              <Galleria
                :value="images"
                v-model:active-index="activeImg"
                containerStyle="width: 100%;"
              >
                <template #item="slotProps">
                  <img :src="slotProps.item" style="width: 100%" />
                </template>
                <template #thumbnail="slotProps">
                  <img
                    :src="slotProps.item"
                    style="width: 100%; object-fit: cover"
                  />
                </template>
              </Galleria>
              <Message
                v-if="message"
                severity="error"
                size="small"
                variant="simple"
                >{{ message }}</Message
              >
              <Button type="submit" label="Тіркелу" @click="save" />
            </div>
          </StepPanel>
          <StepPanel value="2">
            <div class="form">
              <div class="lessons">
                <div class="lessons__item" v-for="(item, ind) in lessons">
                  <div class="lessons__number">#{{ ind+1 }}</div>
                  <div class="lessons__title">{{ item?.title }}</div>
                  <div class="lessons__manage">
                    <Button icon="pi pi-trash" @click="lessons.splice(ind, 1)"/>
                  </div>
                </div>
              </div>
              <div class="form__title">Сабақ қосыңыз</div>
              <FloatLabel style="width: 100%">
                <InputText
                  id="full"
                  v-model="lesson.title"
                  style="width: 100%"
                />
                <label for="full">Толық аты</label>
              </FloatLabel>
              <FloatLabel style="width: 100%">
                <Textarea
                  id="username"
                  v-model="lesson.description"
                  style="width: 100%"
                  rows="5"
                />
                <label for="username">Сипаттама</label>
              </FloatLabel>
              <FloatLabel style="width: 100%">
                <InputText
                  id="full"
                  v-model="lesson.videoUrl"
                  style="width: 100%"
                />
                <label for="full">Бейне сабаққа сілтеме</label>
              </FloatLabel>
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
import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import firstImg from "@assets/eng-start.png";
import secondImg from "@assets/eng-mid.png";
import thirdImg from "@assets/eng-adv.png";
import {
  Button,
  Card,
  FloatLabel,
  Galleria,
  InputText,
  Message,
  SelectButton,
  Step,
  StepList,
  StepPanel,
  StepPanels,
  Stepper,
  Textarea,
} from "primevue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const store = useMainStore();
const { currentUser } = storeToRefs(store);
const router = useRouter();
const { create, getPaged } = useQueries();
const images = [firstImg, secondImg, thirdImg];
const activeImg = ref(0);
const activePanel = ref("1");
const lesson = ref({});
const lessons = ref([]);

const roles = ref(["Бала", "Ата-ана"]);
const role = ref("Ата-ана");
const users = ref([]);
const parent = ref();
const message = ref();

onMounted(async () => {
  await getUsers();
  console.log(users.value);
});

const getUsers = async () => {
  users.value = await getPaged({ serviceName: "users" });
  users.value = users.value.filter((user) =>
    user?.roles?.find((role) => role?.name === "ROLE_PARENT")
  );
};

const item = ref({});

const save = async () => {
  if (!item.value?.title || !item.value?.description || lessons.value.length <= 0) {
    message.value = "Дұрыс ақпаратты енгізіңіз";
    return;
  }

  const newItem = {
    ...item.value,
    lessons: lessons.value,
    preview: activeImg.value
  };
  debugger

  const ans = await create({ item: newItem, serviceName: "course" });
  if (ans) {
    router.push({ name: "Lesson" });
  }
};

const createLesson = () => {
  lessons.value.push({ ...lesson.value });
  lesson.value = {}
};
</script>

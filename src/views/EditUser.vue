<template>
  <Card style="max-width: 500px; width: 100%;">
    <template #content>
      <div class="form">
        <div class="form__title">Өңдеу</div>
        <FloatLabel style="width: 100%">
          <InputText
            id="fullName"
            v-model="item.fullName"
            style="width: 100%"
          />
          <label for="fullName">Толық аты</label>
        </FloatLabel>
        <FloatLabel style="width: 100%">
          <InputText id="email" v-model="item.email" style="width: 100%" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel style="width: 100%">
          <Password
            v-model="item.password"
            placeholder="Құпия сөз"
            toggle-mask
            :feedback="false"
            :style="{ width: '100%' }"
            :input-style="{ width: '100%' }"
          />
          <label for="username">Құпия сөз</label>
        </FloatLabel>
        <Message
          v-if="message"
          severity="error"
          size="small"
          variant="simple"
          >{{ message }}</Message
        >
        <Button type="submit" label="Сақтау" @click="save" />
      </div>
    </template>
  </Card>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import router from "@/router";
import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import {
  Button,
  Card,
  FloatLabel,
  InputText,
  Message,
  Password,
} from "primevue";
import { onMounted, ref } from "vue";

const item = ref({});

const { update, getMe } = useQueries();
const store = useMainStore();
const { currentUser } = storeToRefs(store);

onMounted(() => {
  const { fullName, email } = currentUser.value;
  item.value = { fullName, email };
});

const save = async () => {
  const newItem = {
    id: currentUser.value?.id,
    userDto: { ...item.value },
  };
  const answer = await update({ item: newItem, serviceName: "users" });

  if (answer) {
    await getMe()
    router.push({ name: "Profile" });
  }
};
</script>

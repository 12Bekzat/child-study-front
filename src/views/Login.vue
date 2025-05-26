<template>
  <Card style="max-width: 500px; width: 100%;">
    <template #content>
      <div class="form">
        <div class="form__title">Кіру</div>
        <FloatLabel style="width: 100%">
          <InputText id="username" v-model="username" style="width: 100%" />
          <label for="username">Пайдаланушы</label>
        </FloatLabel>
        <FloatLabel style="width: 100%">
          <Password
            v-model="password"
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
        <Button type="submit" label="Кіру" @click="submit" />
      </div>
    </template>
  </Card>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import { useApi } from "@/utils/api";
import { storeToRefs } from "pinia";
import {
  Button,
  Card,
  FloatLabel,
  InputText,
  Message,
  Password,
} from "primevue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useMainStore();
const { currentUser } = storeToRefs(store);
const router = useRouter();
const { post } = useApi();

const username = ref("");
const message = ref("");
const password = ref("");

const { login, getMe } = useQueries();

const submit = async () => {
  if (!username.value || !password.value) return;

  const ans = await login(username.value, password.value);

  if (ans) {
    await getMe();
    router.push({ name: "Profile" });
  } else {
    message.value = 'Логин немесе пароль дұрыс емес!'
  }
};
</script>

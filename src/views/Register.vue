<template>
  <Card style="max-width: 500px; width: 100%;">
    <template #content>
      <div class="form">
        <div class="form__title">Тіркелу</div>
        <SelectButton v-model="role" :options="roles" />
        <FloatLabel style="width: 100%">
          <InputText id="full" v-model="item.fullName" style="width: 100%" />
          <label for="full">Толық аты</label>
        </FloatLabel>
        <FloatLabel style="width: 100%">
          <InputText
            id="username"
            v-model="item.username"
            style="width: 100%"
          />
          <label for="username">Пайдаланушы</label>
        </FloatLabel>
        <FloatLabel style="width: 100%">
          <InputText id="email" v-model="item.email" style="width: 100%" />
          <label for="email">Email</label>
        </FloatLabel>
        <FloatLabel style="width: 100%" v-if="role === 'Бала'">
          <Select
            :options="users"
            v-model="parent"
            option-label="fullName"
            option-value="id"
            style="width: 100%"
          />
          <label for="email">Ата ана</label>
        </FloatLabel>
        <Message
          v-if="message"
          severity="error"
          size="small"
          variant="simple"
          >{{ message }}</Message
        >
        <Button type="submit" label="Тіркелу" @click="save" />
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
  Select,
  SelectButton,
} from "primevue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const store = useMainStore();
const { currentUser } = storeToRefs(store);
const router = useRouter();
const { create, getPaged } = useQueries();

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
  users.value = users.value.filter(
    (user) => user?.roles?.find((role) => role?.name === "ROLE_PARENT")
  );
};

const item = ref({});

const save = async () => {
  if (!item.value?.username || !role.value) {
    message.value = "Дұрыс ақпаратты енгізіңіз";
    return;
  }

  console.log('parent', parent.value);
  
  const newItem = {
    ...item.value,
    password: "123123",
    extra: "",
    url: "",
    parentId: parent.value,
    roles: [role.value === "Бала" ? "ROLE_CHILD" : "ROLE_PARENT"],
  };
  console.log(newItem);

  const ans = await create({ item: newItem, serviceName: "users" });
  if (ans) {
    router.push({ name: "Admin" });
  }
};
</script>

<template>
  <DataTable :value="users" style="width: 80%;">
    <Column field="fullName" header="Толық аты"></Column>
    <Column field="email" header="Email"></Column>
    <Column header="Рөлі">
      <template #body="{ data }">
        {{ getRole(data?.roles?.length > 0 ? data?.roles[0]?.name : "") }}
      </template>
    </Column>
    <Column header="Ата-анасы">
      <template #body="{ data }">
        {{ data?.parent?.fullName || '-' }}
      </template>
    </Column>
    <Column header="">
      <template #body="{ data }">
        <div class="flex" style="display: flex; gap: 12px;">
            <Button icon="pi pi-trash" severity="danger" @click="removeUser(data)"/>
        </div>
      </template>
    </Column>
    <template #empty>
        Пайдаланушылар жоқ
    </template>

    <template #header>
        <Button label="Жасау" @click="$router.push({ name: 'CreateUser' })"/>
    </template>
  </DataTable>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import { Button, Column, DataTable } from "primevue";
import { onMounted, ref } from "vue";

const users = ref([]);

const store = useMainStore();
const { currentUser } = storeToRefs(store);
const { getPaged, remove } = useQueries();

const getUsers = async () => {
  users.value = await getPaged({ serviceName: "users" });
    users.value = users.value.filter(user => !user?.roles?.find(role => role?.name === "ROLE_ADMIN")).map(user => {
        const parentId = user?.parentId
        if (parentId) {
            user.parent = users.value.find(us => us?.id === parentId)
        }
        return user
    })

    console.log(users.value);
};

onMounted(async () => {
    await getUsers()
})

const removeUser = async (data) => {
    try {
        await remove({ id: data?.id, serviceName: 'users' })
    } finally {
        await getUsers()
    }
}

const getRole = (name) => {
    console.log(name);
    
  if (name === "") return "-";
  const result = {
    ROLE_ADMIN: "Админстратор",
    ROLE_PARENT: "Ата-ана",
    ROLE_CHILD: "Бала",
  };

  return result[name];
};
</script>

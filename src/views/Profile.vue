<template>
  <div class="profile">
    <div class="profile__img">
      <Avatar
        label="P"
        shape="circle"
        size="xlarge"
        style="width: 200px; height: 200px"
      />
    </div>
    <div class="profile__info">
      <div class="profile__title">
        {{ currentUser?.fullName || "No Full name" }}
      </div>
      <div class="profile__text">
        {{
          getRole(
            currentUser?.roles?.length > 0 ? currentUser.roles[0]?.name : ""
          )
        }}
      </div>
      <div class="profile__text">{{ currentUser?.email }}</div>
    </div>
    <div class="profile__manage">
      <Button label="Өңдеу" icon="pi pi-pen-to-square" @click="router.push({ name: 'EditUser' })"/>
      <Button label="Шығу" severity="danger" icon="pi pi-sign-out" @click="signOut"/>
    </div>
  </div>
  <div class="flex" style="width: 90%; padding: 18px">
    <MeterGroup :value="value" style="width: 100%" />
  </div>

  <div class="childs" v-if="isAdmin('ROLE_PARENT')">
    <div class="childs__item" v-for="user in users">
      {{ user?.fullName }}
    </div>
  </div>
</template>
<script setup>
import { useQueries } from "@/composables/useQueries";
import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import { Avatar, Button, MeterGroup } from "primevue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const store = useMainStore();
const { currentUser } = storeToRefs(store);
const { getPaged } = useQueries()

const value = ref([
  { label: "Жұлдызша", color: "#34d399", value: 16, icon: "pi pi-star-fill" },
  { label: "Алмас", color: "#fbbf24", value: 8, icon: "pi pi-ethereum" },
  { label: "Алтын белгі", color: "#60a5fa", value: 24, icon: "pi pi-trophy" },
  { label: "Күміс теңге", color: "#c084fc", value: 10, icon: "pi pi-bitcoin" },
]);

const isAdmin = (roleN = 'ROLE_ADMIN') => {
    const roles = currentUser.value?.roles;

    return roles?.length > 0
        ? roles.find((role) => role.name === roleN)
        : false;
};

const router = useRouter();

const getRole = (name) => {
  if (name === "") return "Жоқ";
  const result = {
    ROLE_ADMIN: "Админстратор",
    ROLE_PARENT: "Ата-ана",
    ROLE_CHILD: "Бала",
  };

  return result[name];
};

const signOut = () => {
  localStorage.removeItem("jwt_token");
  currentUser.value = null;
  router.push({ name: "Login" });
};

const users = ref([])

onMounted(async () => {
  await getChilds()
})

const getChilds = async () => {
  users.value = await getPaged({ serviceName: 'users' })
  users.value = users.value.filter(user => user?.parentId && user?.parentId === currentUser.value?.id)
}
</script>

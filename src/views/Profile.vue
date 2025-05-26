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
</template>
<script setup>
import { useMainStore } from "@/stores/mainStore";
import { storeToRefs } from "pinia";
import { Avatar, Button, MeterGroup } from "primevue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const store = useMainStore();
const { currentUser } = storeToRefs(store);

const value = ref([
  { label: "Жұлдызша", color: "#34d399", value: 16, icon: "pi pi-star-fill" },
  { label: "Алмас", color: "#fbbf24", value: 8, icon: "pi pi-ethereum" },
  { label: "Алтын белгі", color: "#60a5fa", value: 24, icon: "pi pi-trophy" },
  { label: "Күміс теңге", color: "#c084fc", value: 10, icon: "pi pi-bitcoin" },
]);

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
</script>

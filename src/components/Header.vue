<template>
    <Menubar :model="items" style="width: 100%;">
    <template #start>
        <div class="logo">CHILD-STUDY</div>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="link" v-bind="props.action" v-if="(item?.meta?.isAdmin && isAdmin()) || (!item?.meta?.isAdmin)">
            <RouterLink class="link" :to="item?.to">{{ item.label }}</RouterLink>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
        </a>
    </template>
    <template #end>
        <div class="flex items-center gap-2">
            <SplitButton :model="profileItems" text>
                <Avatar :label="getFirstLetter()" shape="circle"/>
            </SplitButton>
        </div>
    </template>
</Menubar>
</template>
<script setup>
import { useMainStore } from '@/stores/mainStore';
import { storeToRefs } from 'pinia';
import { Avatar, Badge, Image, Menubar, SplitButton } from 'primevue';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const store = useMainStore()
const { currentUser } = storeToRefs(store)

const items = ref([
    {
        label: 'Басты бет',
        icon: 'pi pi-home',
        to: '/'
    },
    {
        label: 'Сабақтар',
        icon: 'pi pi-search',
        to: '/lessons'
    },
    {
        label: 'Ойындар',
        icon: 'pi pi-search',
        to: '/games'
    },
    {
        label: 'Тапсырмалар',
        icon: 'pi pi-search',
        to: '/tasks',
    },
    {
        label: 'Басқару тақтасы',
        icon: 'pi pi-search',
        to: '/admin',
        meta: { isAdmin: true }
    },
]);

const isAdmin = () => {
  const roles = currentUser.value?.roles;

  return roles?.length > 0
    ? roles.find((role) => role.name === "ROLE_ADMIN")
    : false;
};

const getFirstLetter = () => {
    return currentUser.value?.fullName ? currentUser.value?.fullName[0] : 'A'
}

const router = useRouter()

const profileItems = [
    {
        label: 'Профиль',
        command: () => {
            router.push({ name: 'Profile' })
        }
    },
    {
        separator: true
    },
    {
        label: 'Шығу',
        command: () => {
            currentUser.value = null
            router.push({ name: "Login" })
        }
    }
];


</script>

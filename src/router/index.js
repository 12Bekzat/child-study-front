import { useMainStore } from '@/stores/mainStore'
import DetailsLesson from '@/views/DetailsLesson.vue'
import DetailsOneLesson from '@/views/DetailsOneLesson.vue'
import Games from '@/views/Games.vue'
import Home from '@/views/Home.vue'
import Lesson from '@/views/Lesson.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import EditUser from '@/views/EditUser.vue'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/views/Admin.vue'
import CreateCourse from '@/views/CreateCourse.vue'
import Game from '@/views/Game.vue'
import Test from '@/views/Test.vue'
import TestDetails from '@/views/TestDetails.vue'
import CreateTests from '@/views/CreateTests.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/lessons',
      name: 'Lesson',
      component: Lesson,
      meta: { requiresAuth: true }
    },
    {
      path: '/games',
      name: 'Games',
      component: Games,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/details-lesson',
      name: 'DetailsLesson',
      component: DetailsLesson,
    },
    {
      path: '/details-one-lesson',
      name: 'DetailsOneLesson',
      component: DetailsOneLesson,
    },
    {
      path: '/edit-user',
      name: 'EditUser',
      component: EditUser,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Test,
    },
    {
      path: '/create-test',
      name: 'CreateTests',
      component: CreateTests,
    },
    {
      path: '/test-details',
      name: 'TestDetails',
      component: TestDetails,
    },
    {
      path: '/create-user',
      name: 'CreateUser',
      component: Register,
    },
    {
      path: '/create-course',
      name: 'CreateCourse',
      component: CreateCourse,
    },
    {
      path: '/play',
      name: 'PlayGame',
      component: Game,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    }
  ],
})

// router.beforeEach((to, from, next) => {
//   const mainStore = useMainStore()
//   const { currentUser } = storeToRefs(mainStore)
//   console.log(currentUser.value);
  

//   if (to.meta.requiresAuth && !currentUser.value) router.push({ name: 'Login' })
//   if (to.meta.isAdmin  && !currentUser.value && !currentUser.value?.roles?.find(role => role === 'ADMIN')) router.push({ name: 'Home' })
//   else next()
// })

export default router

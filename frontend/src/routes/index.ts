import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Landing Page",
    component: () => import("@/views/LandingPageView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/LogoutView.vue"),
    meta: {
      requiresAuth: true,
      icon: ["fas", "right-from-bracket"],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta?.requiresAuth) {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      if (!(await authStore.refreshSession())) {
        authStore.logout();
        next({ name: "Login" });
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

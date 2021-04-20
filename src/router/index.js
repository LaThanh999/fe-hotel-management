import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Layout from "../views/layouts/Main.vue";
import constants from "@/constants";

const { TOKEN } = constants;

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Layout,
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  const { requireAuth } = to.meta;
  const currentUser = localStorage.getItem(TOKEN.ACCESS_TOKEN);
  if (requireAuth && !currentUser) {
    return next({ path: "/login" });
  }
  if (currentUser && to.path == "/login") {
    return next({ path: "/" });
  }
  next();
});

export default router;

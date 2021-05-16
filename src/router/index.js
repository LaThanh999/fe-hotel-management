import Vue from "vue";
import VueRouter from "vue-router";
import constants from "@/constants";

const { TOKEN } = constants;

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login"),
  },
  {
    path: "",
    component: () => import("../views/layouts/Main.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/rooms",
        name: "Rooms",
        component: () => import("../views/rooms/Rooms"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/roomsType",
        name: "RoomsType",
        component: () => import("../views/roomsType/roomTypes"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/users",
        name: "Users",
        component: () => import("../views/users/users"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/customers",
        name: "Customer",
        component: () => import("../views/customers/Customers"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/book-room",
        name: "Book Room",
        component: () => import("../views/bookRoom/BookRoom"),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/payment",
        name: "Payment",
        component: () => import("../views/payment/payment"),
        meta: {
          requireAuth: true,
        },
      },
    ],
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

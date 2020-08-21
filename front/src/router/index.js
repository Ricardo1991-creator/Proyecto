import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/articles",
    name: "Articles",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ListMoneys.vue"),
  },
  {
    path: "/register",
    name: "register",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Registro.vue"),
  },
  {
    path: "/updateuser",
    name: "GetUser",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GetUser.vue"),
  },
  {
    path: "/newmoney",
    name: "NewMoney",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewMoney.vue"),
  },
  {
    path: "/editpassword",
    name: "EditPassword",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditPassword.vue"),
  },
  {
    path: "/recover-password",
    name: "RecoverPassword",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RecoverPassword.vue"),
  },
  {
    path: "/userbookings",
    name: "UserBookings",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserBookings.vue"),
  },
  {
    path: "/userarticles",
    name: "UserArticles",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UserArticles.vue"),
  },
  {
    path: "*",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Error.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

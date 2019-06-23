import Vue from "vue";
import Router from "vue-router";
import Book from "./views/Book.vue";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Search from "./views/Search.vue";
import SignUp from "./views/SignUp.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/search",
      name: "search",
      component: Search,
    },
    {
      path: "/book/:id",
      name: "book",
      component: Book,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    // },
  ],
});

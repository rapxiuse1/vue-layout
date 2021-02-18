import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  linkExactActiveClass: "active",
  routes: [

    // {
    //   path: "/",
    //   redirect:{
    //     name: "home1",
    //   }
    //   // name: "home1",
    //   // component: () => import(".iews/home1/index1.vue"),
    // },
    {
      path: "/:name",
      name: "home1",
      component: () => import("./views/home1/index1.vue"),
    },
    {
      path: "/home1",
      name: "home1",
      component: () => import("./views/home1/index1.vue"),
    },
    {
      path: "/home2",
      name: "home2",
      component: () => import("./views/home2/index2.vue"),
    },



    // {
    //   path: "/",
    //   name: "home",
    //   component: Home, // 首页
    // },
    // {
    //   path: "/",
    //   name: "home1",
    //   component: () => import("./views/home1/index1.vue"),
    // },
    // {
    //   path: "/",
    //   name: "home2",
    //   component: () => import("./views/Home2.vue"),
    // },
    // {
    //   path: "/home1",
    //   name: "home1",
    //   component: () => import("./views/home1/index1.vue"),
    // },
    // {
    //   path: "/home2",
    //   name: "home2",
    //   component: () => import("./views/home2/index2.vue"),
    // },
    {
      path: "/home3",
      name: "home3",
      component: () => import("./views/Home3.vue"),
    },
    {
      path: "/impontentwj",
      name: "impontentwj",
      component: () => import("./views/Impontentwj.vue"), //首页1
    },
    // {
    //   path: "/infos/",
    //   name: "infos",
    //   component: () => import("./views/Infos.vue"),
    // },
    {
      path: "/infos2",
      name: "infos2",
      component: () => import("./views/home2/infos2.vue"),
    },{
      path: "/detail2",
      name: "detail2",
      component: () => import("./views/home2/detail2.vue"),
    },{
      path: "/search2",
      name: "search2",
      component: () => import("./views/home2/Search2.vue"),
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("./views/Detail.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Search.vue"),
    },
  ],
})

export default router

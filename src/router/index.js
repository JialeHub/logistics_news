import Vue from "vue";
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push;

/*屏蔽同页面跳转报错*/
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

const routes = [
  { path: "/home", redirect: "/" },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home"),
    meta: {
      title: "老撾韻達快遞" // 标题设置
    }
  },
  {
    path: "/networkDistribution",
    name: "networkDistribution",
    component: () => import("@/views/networkDistribution"),
    meta: {
      title: "韻達網點分布" // 标题设置
    }
  },
  {
    path: "/tracking",
    name: "tracking",
    component: () => import("@/views/tracking"),
    meta: {
      title: "韻達物流單號查詢" // 标题设置
    }
  },
  {
    path: "/notice/:noticeId",
    name: "notice",
    component: () => import("@/views/notice"),
    meta: {
      title: "韻達快遞 | 公告" // 标题设置
    }
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/news"),
    meta: {
      title: "韻達快遞 | 新聞咨詢" // 标题设置
    }
  },
  {
    path: "/newsIn/:newsId",
    name: "newsIn",
    component: () => import("@/views/newsIn"),
    meta: {
      title: "" // 标题设置
    }
  },
  {
    path: "/help",
    name: "help",
    component: () => import("@/views/help"),
    meta: {
      title: "韻達客服中心" // 标题设置
    }
  },
  {
    path: "/404",
    name: "error404",
    component: () => import("@/views/error/404"),
    meta: {
      title: "老撾韻達" // 标题设置
    }
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "hash",
  //base: process.env.BASE_URL,
  routes
});

export default router;

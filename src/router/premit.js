import router from "./index";
import store from "@/store/index";

const needLogin = []; //拦截对象

//路由守卫：
router.beforeEach((to, from, next) => {
  //检测token是否存在（是否登录）
  if (store.getters.token && store.getters.token !== "") {
    next();
  } else {
    store.dispatch("exitLogin");
    if (needLogin.indexOf(to.path) === -1) {
      next();
    } else {
      next("/login");
    }
  }
});

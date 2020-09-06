import Vue from "vue";
import router from "./router";
import store from "./store";
import "./router/premit";
import "@/styles/reset.scss";
import "./utils/VantUI";
import "@vant/touch-emulator";
import App from "./App.vue";
import VueWechatTitle from "vue-wechat-title";
import "@/assets/icons";
Vue.use(VueWechatTitle);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

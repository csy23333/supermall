import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from "@/components/common/toast";
import vueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(toast);
Vue.use(vueLazyLoad, {
  loading: require("./assets/img/home/self.jpg")
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");

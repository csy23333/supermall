import Toast from "@/components/common/toast/Toast";
// import Vue from "_vue@2.6.12@vue";
const obj = {};
obj.install = function(Vue) {
  const toastConstructor = Vue.extend(Toast);
  const toast = new toastConstructor();
  toast.$mount(document.createElement("div"));
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
};
export default obj;

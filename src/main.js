import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "../src/plugins/vuetify";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/styles/main.scss";
import DatetimePicker from "vuetify-datetime-picker";

Vue.config.productionTip = false;
const options = {
  // You can set your default options here
};
Vue.use(Toast, options);
Vue.use(DatetimePicker);

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");

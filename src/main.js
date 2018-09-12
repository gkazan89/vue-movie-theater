import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vue2Filters from "vue2-filters";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

Vue.use(Vue2Filters);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

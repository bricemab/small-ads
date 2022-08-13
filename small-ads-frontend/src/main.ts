import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from "./locales/i18n";
import "./registerServiceWorker";
import Buefy from "buefy";
// @ts-ignore

// @ts-ignore
import Vuep from "vuep";
import "vuep/dist/vuep.css";

Vue.use(Vuep /*, { codemirror options } */);

Vue.config.productionTip = false;


Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultModalCanCancel: ["escape", "x", "button"],
});

const token = sessionStorage.getItem("token");
if (token) {
  console.log("welcome");
  store.dispatch("welcomeBack", token).then(() => {
    // router.push({ name: "root" });
  });
}

new Vue({
  i18n,
  router,
  store,
  render: (h: any) => h(App),
}).$mount("#app");

import Vue from "vue";
import VueI18n from "vue-i18n";
import messagesFR from "./fr/translations.json";
// import messagesDE from "./de/translations.json";
Vue.use(VueI18n);
const messages = {
  fr: messagesFR,
  // de: messagesDE,
};
export const i18n = new VueI18n({
  locale: "fr",
  fallbackLocale: "fr",
  messages,
});
//# sourceMappingURL=i18n.js.map

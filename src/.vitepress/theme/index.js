import Layout from "./Layout.vue";
import NotFound from "./404.vue";
import SelectLanguage from "../../components/SelectLanguage.vue";

export default {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    app.component("SelectLanguage", SelectLanguage);
  },
};

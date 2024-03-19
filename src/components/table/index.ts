import type { App } from "vue";
import Table from "./src/index.vue";

export default {
  install(app: App) {
    app.component("m-table", Table);
  },
};

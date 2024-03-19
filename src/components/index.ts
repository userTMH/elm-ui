import type { App } from "vue";
import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";
import Menu from "./menu";
import Form from "./form";
import Table from "./table";

const components = [chooseArea, chooseIcon, Menu, Form, Table];

export default {
  install(app: App) {
    components.forEach((item) => {
      app.use(item);
    });
  },
};

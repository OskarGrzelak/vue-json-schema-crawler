import { createApp } from "vue";
import App from "./App.vue";
import clickOutside from "./directives/clickOutside";

import "./assets/main.css";

const app = createApp(App);

app.directive("click-outside", clickOutside);
app.mount("#app");

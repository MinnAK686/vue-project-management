import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { auth } from "./firebase";

loadFonts();

let app;

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .component("Datepicker", Datepicker)
            .use(router)
            .use(vuetify)
            .mount("#app");
    }
});

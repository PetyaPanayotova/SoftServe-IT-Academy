import Firebase from "firebase/app";
import Vue from "vue";
import { firestorePlugin } from "vuefire";
import FirebaseConfig from "./config/firebase";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Firebase.initializeApp(FirebaseConfig);

Vue.use(firestorePlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

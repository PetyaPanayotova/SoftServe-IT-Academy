import Firebase from "firebase/app";
import "firebase/firestore";
import Vue from "vue";
import FirebaseConfig from "./config/firebase";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

const app = Firebase.initializeApp(FirebaseConfig);

new Vue({
  router,
  provide: { db: app.firestore() },
  render: (h) => h(App),
}).$mount("#app");

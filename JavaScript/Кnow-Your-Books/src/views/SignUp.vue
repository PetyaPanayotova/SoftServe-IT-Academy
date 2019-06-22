<template>
  <div id="signup" class="input-form">
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button v-on:click="signUp">Sign Up</button>
    <p>Already have an account? <router-link to="/login">Login</router-link> now.</p>
  </div>
</template>

<script lang="ts">
import Firebase from "firebase/app";
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "SignUp" })
export default class SignUp extends Vue {

  protected email: string = "";
  protected password: string = "";

  public signUp() {
    Firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
      (user) => {
        this.$router.replace("home");
      },
      (err) => {
        alert("Oops. " + err.message);
      },
    );
  }

}
</script>

<style lang="scss">

</style>

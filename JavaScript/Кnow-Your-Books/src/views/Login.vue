<template>
  <div id="login" class="input-form">
    <input type="text" v-model="email" placeholder= "Email" />
    <input type="password" v-model="password" placeholder= "Password" />
    <button v-on:click="login">Login</button>
    <hr/>
    <button v-on:click="loginWithGoogle">Login with Google</button>
    <p>Don't have an account? <router-link to="/signup">Create</router-link> one for free.</p>
  </div>
</template>

<script lang="ts">
import Firebase from "firebase/app";
import "firebase/auth";
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "Login" })
export default class Login extends Vue {

  protected email: string = "";
  protected password: string = "";

  public login() {
    this.processLogin(Firebase.auth().signInWithEmailAndPassword(this.email, this.password));
  }

  public loginWithGoogle() {
    this.processLogin(Firebase.auth().signInWithPopup(new Firebase.auth.GoogleAuthProvider()));
  }

  private processLogin(promise: Promise<Firebase.auth.UserCredential>) {
    promise.then(() => {
      const redirect = this.$route.query.redirect as string;
      if (redirect) {
        // Wait a bit until the isLoggedIn state is updated.
        setTimeout(() => this.$router.replace(redirect), 500);
      }
    });
  }

}
</script>

<style lang="scss">
</style>

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
    Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
      this.$router.replace("home");
    }).catch((err) => {
      alert("Oops. " + err.message);
    });
  }

  public loginWithGoogle() {
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider).then((result) => {
      this.$router.replace("home");
    }).catch((err) => {
      alert("Oops. " + err.message);
    });
  }



}
</script>

<style lang="scss">
</style>

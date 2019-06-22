<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">KnowYourBooks</router-link>
      </div>
      <div v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Sign Up</router-link>
      </div>
      <div v-else>
        <router-link to="/logout">Logout</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Firebase from "firebase/app";
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "App" })
export default class App extends Vue {

  public isLoggedIn: boolean = false;

  public created() {
    Firebase.auth().onAuthStateChanged((user) => {
      this.isLoggedIn = Boolean(user);
      if (!user) {
        this.$router.push("login");
      } else {
        this.$router.push("home");
      }
    });
  }

}
</script>


<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 960px;
}

#nav {
  display: flex;
  justify-content: space-between;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.input-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px auto;
  width: 400px;

  & > input {
    margin: 10px 0;
    padding: 15px;
    width: 100%;
  }

  & > button {
    margin: 10px auto;
    padding: 15px;
    cursor: pointer;
    width: 100%;
  }

  & > hr {
    width: 100%;
  }
}
</style>

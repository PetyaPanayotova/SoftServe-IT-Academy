<script lang="ts">
import Firebase from "firebase/app";
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "Logout" })
export default class Logout extends Vue {

  public created() {
    // Logout the user and navigate to Home
    Firebase.auth().signOut().then(() => this.$router.push("home"));
  }

  public render() {
    // Don't render anything
  }

}
</script>

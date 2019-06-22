<script lang="ts">
import Firebase from "firebase/app";
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "Logout" })
export default class Logout extends Vue {

  public created() {
    Firebase.auth().signOut().then(() => {
      this.$router.replace("/");
    });
  }

  public render() {
    // Don't render anything
  }

}
</script>

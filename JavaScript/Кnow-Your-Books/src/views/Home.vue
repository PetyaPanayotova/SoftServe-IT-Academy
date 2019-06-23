<template>
  <div id="home">
    <SearchForm />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import SearchForm from "../components/SearchForm.vue";

@Component({
  name: "Home",
  components: {
    SearchForm
  }
})
export default class Home extends Vue {

}
</script>

<style lang="scss">
#home {
  max-width: 960px;
}
</style>

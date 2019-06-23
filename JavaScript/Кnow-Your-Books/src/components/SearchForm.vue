<template>
  <div class="search-form">
    <div class="search-box">
      <input type="text" v-model="searchText" placeholder="Search" autofocus v-on:keyup.enter="searchBooks" />
      <button v-on:click="searchBooks">Search</button>
    </div>
    <div class="search-in">
      <span>Search in:</span>

      <label>
        <input type="radio" name="searchIn" v-model="searchIn" value="all" checked /> Everything
      </label>

      <label>
        <input type="radio" name="searchIn" v-model="searchIn" value="title" /> Title
      </label>

      <label>
        <input type="radio" name="searchIn" v-model="searchIn" value="author" /> Author
      </label>

      <label>
        <input type="radio" name="searchIn" v-model="searchIn" value="genre" /> Genre
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({ name: "SearchForm" })
export default class SearchForm extends Vue {

  protected searchText: string = "";
  protected searchIn: string = "";

  @Prop()
  public query?: string;

  @Prop()
  public scope?: string;

  @Watch("query", { immediate: true })
  public onQueryChange() {
    this.searchText = this.query || "";
  }

  @Watch("scope", { immediate: true })
  public onScopeChange() {
    this.searchIn = this.scope || "all";
  }

  protected searchBooks() {
    this.$router.push({ name: "search", query: { query: this.searchText, scope: this.searchIn }});
  }

}
</script>

<style lang="scss">
.search-form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;

  & > .search-box {
    display: flex;
    margin: 20px 0;

    & > input {
      flex: 1 1 auto;
      padding: 15px;
    }

    & > button {
      flex: 0 0 auto;
      padding: 0 15px;
    }
  }

  & > .search-in {
    display: flex;
    justify-content: space-around;
    white-space: nowrap;

    & > input {
      margin-left: 20px;
      margin-right: 10px;
    }
  }
}
</style>

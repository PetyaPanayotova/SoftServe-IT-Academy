<template>
  <div id="search">
    <SearchForm :query="query" :scope="scope" />
    <div v-if="results !== null" class="search-results">
      <h3 class="search-header">
        <span>
          {{results.length}} results found
        </span>
      </h3>
      <ul v-if="results.length">
      <li v-for="book in results" :key="book.title">
        <div class="book-result">
        <div class="book-cover">
          <img :src="book.cover" />
        </div>
        <div class="book-details">
          <div class="book-title">
            <router-link :to="`/book/${book.id}`">{{book.title}}</router-link></div>
          <div class="book-authors">by {{book.authors.join(", ")}}</div>
        </div>
        </div>
      </li>
      </ul>
      <p v-else>
        No results found.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from "vue-property-decorator";
import SearchForm from "../components/SearchForm.vue";
import { BookService } from "../services/BookService";

@Component({
  name: "Search",
  components: {
    SearchForm
  }
})
export default class Search extends Vue {

  @Inject()
  protected bookService!: BookService;

  protected query: string = "";
  protected scope: string = "";
  protected results: any[] | null = null;

  @Watch("$route", { immediate: true, deep: true })
  private onRouteChange(newVal: any) {
    this.query = this.$route.query.query as string;
    this.scope = this.$route.query.scope as string;
    this.bookService.getBooks(this.query, this.scope).then(results => this.results = results);
  }

}
</script>

<style lang="scss">
.search-results {
  margin-top: 40px;

  & > ul {
    margin: 0;
    padding: 0;

    & > li {
      list-style: none;
      padding: 0;
    }
  }
}

.search-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  text-align: left;
}

.book-result {
  display: flex;
  margin: 10px 0;

  & > .book-cover {
    flex: 0 0 auto;
    margin-right: 20px;
  }

  & > .book-details {
    flex: 1 1 auto;
    overflow: hidden;
    text-align: left;

    & > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > .book-title {
      font-size: 1.25em;
      font-weight: bold;
    }
  }
}
</style>

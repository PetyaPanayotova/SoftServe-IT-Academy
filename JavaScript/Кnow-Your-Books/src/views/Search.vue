<template>
  <div id="search">
    <SearchForm :query="query" :scope="scope" />
    <div v-if="results !== null" class="search-results">
      <h3 class="search-header">
        <span>
          {{results.length}} results found
        </span>
        <span>
          show only:
          <select v-model="rating" v-on:change="onRatingChange">
            <option v-for="opt in ratingFilter" :value="opt.value" :key="opt.value">rated {{opt.text}}</option>
          </select>
          sort by:
          <select v-model="order" v-on:change="onSortChange">
            <option v-for="opt in orderBy" :value="opt.value" :key="opt.value">{{opt.text}}</option>
          </select>
        </span>
      </h3>
      <ul v-if="results.length">
      <li v-for="book in results" :key="book.title">
        <div class="book-result">
          <div class="book-cover">
            <img :src="book.coverSmall" />
          </div>
          <div class="book-summmary">
            <div class="book-title">
              <router-link :to="`/book/${book.id}`">{{book.title}}</router-link>
            </div>
            <div class="book-authors">by {{book.authors.join(", ")}}</div>
            <div class="book-details">
              {{book.rating}} avg rating
              —
              {{book.ratingCount.toLocaleString()}} ratings
              —
              published {{book.year}}
            </div>
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
  protected order: string = "";
  protected rating: string = "";
  protected results: any[] | null = null;

  protected orderBy = [
    { text: "Title", value: "title-asc" },
    { text: "Top rated", value: "rating-desc" },
    { text: "Most rated", value: "ratingCount-desc" },
    { text: "Newest", value: "year-desc" },
  ];

  protected ratingFilter = [
    { text: "4+", value: "4" },
    { text: "3+", value: "3" },
    { text: "2+", value: "2" },
  ];

  protected onSortChange() {
    this.$router.push({ path: this.$route.path, query: { ...this.$route.query, order: this.order }});
  }

  protected onRatingChange() {
    this.$router.push({ path: this.$route.path, query: { ...this.$route.query, rating: this.rating }});
  }

  @Watch("$route", { immediate: true, deep: true })
  private onRouteChange(newVal: any) {
    this.order = (this.$route.query.order || "title-asc") as string;
    this.rating = (this.$route.query.rating || "4") as string;
    this.query = this.$route.query.query as string;
    this.scope = this.$route.query.scope as string;
    this.bookService.getBooks(Number(this.rating), this.order, this.query, this.scope)
      .then(results => this.results = results);
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

  & > .book-summmary {
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

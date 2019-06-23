<template>
  <div v-if="book" id="book">
    <div class="book-header">
      <div class="book-cover">
        <img :src="book.cover" />
      </div>
      <div class="book-details">
        <h2>{{book.title}}</h2>
        <p>by {{book.authors.join(", ")}}</p>
      </div>
    </div>
    <ReviewList :reviews="book.reviews" />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import ReviewList from "../components/ReviewList.vue";
import { BookService } from "../services/BookService";

@Component({
  name: "Book",
  components: {
    ReviewList
  }
})
export default class Book extends Vue {

  @Inject()
  protected bookService!: BookService;

  protected book: any = null;

  public created() {
    const id = this.$route.params.id as string;
    this.bookService.getBook(id).then((book) => this.book = book);
  }

}
</script>

<style lang="scss">
#book {
  max-width: 960px;
}

.book-header {
  display: flex;

  & > .book-cover {
    margin-right: 20px;

    & > img {
      width: 200px;
    }
  }

  & > .book-details {
    text-align: left;

    & > h2 {
      margin-top: 0;
    }
  }
}
</style>

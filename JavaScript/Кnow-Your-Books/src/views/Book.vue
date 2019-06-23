<template>
  <div v-if="book" id="book">
    <div class="book-header">
      <div class="book-cover">
        <img :src="book.coverImage" />
      </div>
      <div class="book-details">
        <h2>{{book.title}}</h2>
        <p>by {{book.authors.join(", ")}}</p>
        <div class="book-details">
          {{book.rating}} avg rating
          —
          {{book.ratingCount.toLocaleString()}} ratings
          —
          published {{book.year}}
          <br/><br/>
          ISBN: {{book.isbn.filter(x => Boolean(x)).join(", ")}}
          <br/><br/>
          <a :href="`https://www.goodreads.com/book/show/${book.goodreadsID}`" target="_blank">
            Find out more at GoodReads.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { BookService } from "../services/BookService";

@Component({ name: "Book" })
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

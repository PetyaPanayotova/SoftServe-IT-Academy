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
    <NoteList :notes="notes" v-on:add="onAddNote" v-on:delete="onDeleteNote" />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import NoteList from "../components/NoteList.vue";
import { BookService } from "../services/BookService";
import { UserService } from "../services/UserService";

@Component({
  name: "Book",
  components: {
    NoteList,
  }
})
export default class Book extends Vue {

  @Inject()
  protected bookService!: BookService;

  @Inject()
  protected userService!: UserService;

  protected book: any = null;
  protected notes: any[] = [];

  public async created() {
    const id = this.$route.params.id as string;
    this.book = await this.bookService.getBook(id);
    this.notes = await this.userService.getNotes(this.book.id);
  }

  protected async onAddNote(note: any) {
    await this.userService.addNote(this.book.id, note);
    this.notes = await this.userService.getNotes(this.book.id);
  }

  protected async onDeleteNote(noteId: string) {
    await this.userService.deleteNote(this.book.id, noteId);
    this.notes = await this.userService.getNotes(this.book.id);
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
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
    margin-right: 40px;

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

<template>
  <div id="notes">
    <h3 class="note-header">Your notes</h3>
    <div class="note-form">
      <textarea ref="noteContent"></textarea>
      <div class="note-form-footer">
        <button v-on:click="onAddNote">Add note</button>
      </div>
    </div>
    <div v-for="note in notes" :key="note.id" class="note-wrapper">
      <div class="note-content">
        {{note.content}}
      </div>
      <div class="note-details">
        {{new Date(note.created).toLocaleDateString()}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "NoteList" })
export default class NoteList extends Vue {

  @Prop()
  public notes!: any[];

  public onAddNote() {
    const textarea = this.$refs.noteContent as HTMLTextAreaElement;
    if (textarea.value) {
      this.$emit("add", { content: textarea.value, created: Date.now() });
      textarea.value = "";
    }
  }

  public onInput() {
    this.$emit("change", this.value);
  }

}
</script>

<style lang="scss">
#notes {
  margin: 40px auto;

  & > .note-header {
    border-bottom: 1px solid black;
    text-align: left;
  }

  & > .note-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-top: 1px solid silver;

    & > .note-content {
      flex: 1 1 auto;
      text-align: left;
    }

    & > .note-details {
      flex: 0 0 auto;
      margin-left: 20px;
      white-space: nowrap;
    }
  }

  & > .note-form {
    margin-bottom: 20px;

    & > h3 {
      text-align: left;
      margin-bottom: 0;
    }

    & > textarea {
      display: block;
      min-height: 10em;
      width: 100%;
    }

    & > .note-form-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      & > button {
        padding: 10px 20px;
        margin: 10px 0;
      }
    }
  }
}
</style>

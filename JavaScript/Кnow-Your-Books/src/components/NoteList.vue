<template>
  <div id="notes">
    <h3 class="note-header">Your notes</h3>
    <div class="note-form">
      <textarea ref="noteContent"></textarea>
      <div class="note-form-footer">
        <button v-on:click="onSetNote">{{ noteId ? "Update note" : "Add note" }}</button>
      </div>
    </div>
    <div v-for="note in notes" :key="note.id" class="note-wrapper">
      <div class="note-content">
        {{note.content}}
      </div>
      <div class="note-details">
        {{new Date(note.created).toLocaleDateString()}}
        <button v-on:click="() => onEditNote(note)" class="update" title="Edit">&swArr;</button>
        <button v-on:click="() => onDeleteNote(note.id)" class="delete" title="Delete">&times;</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "NoteList" })
export default class NoteList extends Vue {

  protected noteId: string = "";

  @Prop()
  public notes!: any[];

  public onSetNote() {
    const textarea = this.$refs.noteContent as HTMLTextAreaElement;
    if (textarea.value) {
      if (this.noteId) {
        this.$emit("update", { id: this.noteId, content: textarea.value, updated: Date.now() });
      } else {
        this.$emit("add", { content: textarea.value, created: Date.now() });
      }
      textarea.value = "";
      this.noteId = "";
    }
  }

  public onEditNote(note: any) {
    const textarea = this.$refs.noteContent as HTMLTextAreaElement;
    textarea.value = note.content;
    this.noteId = note.id;
  }

  public onDeleteNote(noteId: string) {
    this.$emit("delete", noteId);
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

      & > button {
        display: inline-block;
        margin-left: 10px;
        border-radius: 50%;
        font-size: 16px;
        line-height: 15px;
        height: 26px;
        width: 26px;
        overflow: hidden;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        outline: none;

        &.update:hover {
          background-color: #3F51B5; // indigo
          color: white;
        }

        &.delete:hover {
          background-color: #C62828; // red darken-3
          color: white;
        }
      }
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

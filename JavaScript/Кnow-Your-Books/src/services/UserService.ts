import Firebase from "firebase";
import Note from "../models/Notes";

export class UserService {

  private userId: string = "";

  private emailFormat = new RegExp(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g);
  private urlFormat = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);

  public constructor(private db: Firebase.firestore.Firestore) {}

  public isLoggedIn() {
    return Boolean(this.userId);
  }

  public async setCurrentUser(user: Firebase.User | null) {
    if (user) {
      this.userId = user.uid;
      const document = this.db.doc(`users/${this.userId}`);
      const snapshot = await document.get();
      if (!snapshot.exists) {
        await document.set({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          books: {},
        });
      }
    } else {
      this.userId = "";
    }
  }

  public async getNotes(bookId: string): Promise<Note[]> {
    const snapshot = await this.getNoteCollection(bookId).orderBy("created", "desc").get();
    return snapshot.docs.map((x) => ({ content: x.data().content, created: x.data().created, id: x.id }));
  }

  public async addNote(bookId: string, note: any) {
    const notes = await this.getNotes(bookId);
    if (await this.isContentDuplicated(note, notes, this.emailFormat) ||
        await this.isContentDuplicated(note, notes, this.urlFormat) ||
        await this.doesNoteExist(note, notes)) {
          alert("Duplicated content");
    } else {
      await this.getNoteCollection(bookId).add(note);
    }
  }

  public async updateNote(bookId: string, note: any) {
    const noteId = note.id;
    delete note.id; // do not store the ID on update.
    await this.getNoteCollection(bookId).doc(noteId).update(note);
  }

  public async deleteNote(bookId: string, noteId: string) {
    await this.getNoteCollection(bookId).doc(noteId).delete();
  }

  private getNoteCollection(bookId: string) {
    return this.db.collection(`users/${this.userId}/books/${bookId}/notes`);
  }

  private async isContentDuplicated(note: any, notes: any[], contentFormat: RegExp) {
    if (contentFormat.test(note.content)) {
      return notes.map((existingNote) => {
        if (contentFormat.test(existingNote.content)) {
          return existingNote.content.match(contentFormat)[0] === note.content.match(contentFormat)[0];
        } else {
          return false;
        }
      }).includes(true);
    }
  }

  private async doesNoteExist(note: any, notes: any[]) {
    return notes.map((existingNote) => existingNote.content === note.content && new Date(existingNote.created).toDateString() === new Date(note.created).toDateString())
    .includes(true);
  }

}

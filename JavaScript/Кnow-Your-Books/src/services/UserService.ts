import Firebase from "firebase";
import Note from "../models/Notes";

export class UserService {

  private userId: string = "";

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
    if (this.isEmailInNote(note) || this.isLinkinNote(note) || await this.doesNoteExist(bookId, note)) {
      alert("Your note is recognised as spam.");
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

  private isEmailInNote(note: any) {
    const emailFormat = new RegExp(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/);
    return emailFormat.test(note.content);
  }

  private isLinkinNote(note: any) {
    const urlFormat = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
    return urlFormat.test(note.content);
  }

  private async doesNoteExist(bookId: string, note: any) {
    const notes = await this.getNotes(bookId);
    return notes.map((existingNote) => existingNote.content === note.content && new Date(existingNote.created).toDateString() === new Date(note.created).toDateString())
    .includes(true);
  }

}

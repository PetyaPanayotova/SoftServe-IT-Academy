import Firebase from "firebase";

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

  public async getNotes(bookId: string) {
    const snapshot = await this.getNoteCollection(bookId).orderBy("created", "desc").get();
    return snapshot.docs.map((x) => ({ ...x.data(), id: x.id }));
  }

  public async addNote(bookId: string, note: any) {
    await this.getNoteCollection(bookId).add(note);
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

}

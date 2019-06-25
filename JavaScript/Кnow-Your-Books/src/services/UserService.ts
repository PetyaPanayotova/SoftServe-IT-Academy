import Firebase from "firebase";

export class UserService {

  private userId: string = "";

  public constructor(private db: Firebase.firestore.Firestore) {}

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
        });
      }
    } else {
      this.userId = "";
    }
  }

}

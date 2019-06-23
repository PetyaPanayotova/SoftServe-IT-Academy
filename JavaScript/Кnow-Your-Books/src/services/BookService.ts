import Firebase from "firebase";

export class BookService {

  public constructor(private db: Firebase.firestore.Firestore) {}

  public async getBooks(query?: string, scope?: string) {
    const books = (await this.db.collection("books").get()).docs.map((x) => ({ ...x.data(), id: x.id }));
    return query ? books.filter((x) => this.doesBookMatch(x, query, scope)) : books;
  }

  public async getBook(id: string) {
    return (await this.db.collection("books").doc(id).get()).data();
  }

  public async addReview(id: string, data: any) {
    this.db.collection("reviews").doc(id).update(data);
  }

  private doesBookMatch(book: any, query: string, scope?: string): boolean {
    const searchText = query.toLowerCase();
    switch (scope) {
      case "title":
        return book.title.toLowerCase().indexOf(searchText) !== -1;

      case "author":
        return Boolean(book.authors.find((x: any) => x.toLowerCase().indexOf(searchText) !== -1));

      default:
        return (
          book.title.toLowerCase().indexOf(searchText) !== -1
          ||
          Boolean(book.authors.find((x: any) => x.toLowerCase().indexOf(searchText) !== -1))
        );
    }
  }

}

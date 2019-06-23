import Firebase from "firebase";

export class BookService {

  private readonly MAX_RESULTS = 20;

  public constructor(private db: Firebase.firestore.Firestore) {}

  public async getBooks(page: number = 1, orderBy: string = "ratingCount", query?: string, scope?: string) {
    const collection = this.db.collection("books");
    const startAt = (page - 1) * this.MAX_RESULTS;
    const snapshot = (await collection.orderBy(orderBy).startAt(startAt).limit(this.MAX_RESULTS).get());
    const books = snapshot.docs.map((x) => ({ ...x.data(), id: x.id }));
    return query ? books.filter((x) => this.doesBookMatch(x, query, scope)) : books;
  }

  public async getBook(id: string) {
    return (await this.db.collection("books").doc(id).get()).data();
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

import {API_LOCAL} from "@/constant";
import {IBook} from "@/type";

export default class BookApi {
  get baseUrl() {
    return `${API_LOCAL}/book`;
  }

  async getBooks(q?: string): Promise<IBook[]> {
    const url = q
      ? `${this.baseUrl}/search?q=${q}`
      : `${this.baseUrl}`;

    return this.fetch<IBook[]>(url);
  }

  async getRandomBooks(): Promise<IBook[]> {
    const url = `${this.baseUrl}/random`;
    return this.fetch<IBook[]>(url);
  }

  private async fetch<T>(url: string, returnNullOnError: boolean = false): Promise<T> {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error();
      }
      return await res.json();
    } catch (err) {
      console.error(err);
      if (returnNullOnError) {
        return null as T;
      }
      return [] as unknown as T;
    }
  }

  async getBook(bookId: number): Promise<IBook | null> {
    return this.fetch<IBook>(`${this.baseUrl}/${bookId}`, true);
  }
}

import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/SearchableLayout";
import Book from "@/components/Book";
import BookApi from "@/lib/BookApi";
import {useRouter} from "next/router";
import {IBook} from "@/type";
import Head from "next/head";

/**
 *
 export const getServerSideProps = async ({query}: GetServerSidePropsContext) => {
 const q = query.q as string

 let bookApi = new BookApi();

 return {
 props: {
 books: await bookApi.getBooks(q),
 }
 }
 }
 */


/**
 * @description
 * request parameter 존재 할 때 해당 값을 읽기 위해 해당 컴포넌트를 한번 더 읽는다.
 * 이 때, router.query = {q: "requestParameter" }가 매꿔진다.
 */
export default function Page() {
  const [books, setBooks] = useState<IBook[]>([])
  const router = useRouter()

  const q = router.query.q as string;

  const getBooks = async () => {
    const bookApi = new BookApi();
    const books = await bookApi.getBooks(q);
    setBooks(books);
  }

  useEffect(() => {
    if (q) {
      getBooks()
    }
  }, [q])

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png"/>
        <meta property="og:title" content="한입북스 - 검색결과"/>
        <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요"/>
      </Head>
      {books.map(book => (
        <Book key={book.id} {...book} />
      ))}
    </div>
  );
};


Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

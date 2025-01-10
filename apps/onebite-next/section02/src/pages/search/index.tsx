import {ReactNode} from "react";
import SearchableLayout from "@/components/SearchableLayout";
import Book from "@/components/Book";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import BookApi from "@/lib/BookApi";

export const getServerSideProps = async ({query}: GetServerSidePropsContext) => {
  const q = query.q as string

  let bookApi = new BookApi();

  return {
    props: {
      books: await bookApi.getBooks(q),
    }
  }
}

/**
 * @description
 * request parameter 존재 할 때 해당 값을 읽기 위해 해당 컴포넌트를 한번 더 읽는다.
 * 이 때, router.query = {q: "requestParameter" }가 매꿔진다.
 */
export default function Page({books}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>
    {books.map(book => (
      <Book key={book.id} {...book} />
    ))}
  </div>
};


Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

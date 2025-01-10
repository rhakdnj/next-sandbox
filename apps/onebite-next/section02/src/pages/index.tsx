import style from './index.module.css'
import SearchableLayout from "@/components/SearchableLayout";
import {ReactNode, useEffect} from "react";
import Book from "@/components/Book";
import {InferGetStaticPropsType} from "next";
import BookApi from "@/lib/BookApi";

/**
 * SSR: getServerSideProps export
 * // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
 */
export const getStaticProps = async () => {
  const bookApi = new BookApi();
  const [books, recommendBooks] = await Promise.all([
    bookApi.getBooks(),
    bookApi.getRandomBooks()]
  )

  return {
    props: {
      books, recommendBooks,
    }
  }
}

/**
 * @param {{props: any}} props
 * @param {books: IBook[]} props.books
 *
 * @desc Component 서버에서 실행 + 브라우저 실행
 *
 * 서버 실행: 사전 Rendering
 * 브라우저 실행: 브라우저 bundle -> hydration
 */
export default function Home({books, recommendBooks}: InferGetStaticPropsType<typeof getStaticProps>) {
  /**
   * 컴포넌트 브라우저에 마운트 될 때만 실행 되기에 브라우저에서만 실행되게 할 수 있다.
   */
  useEffect(() => {
    // console.log(window)
    console.log(books)
  })

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recommendBooks.map(book => (
          <Book key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map(book => (
          <Book key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

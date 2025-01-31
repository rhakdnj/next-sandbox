import style from "./[bookId].module.css"
import {GetServerSidePropsContext, InferGetStaticPropsType} from "next";
import BookApi from "@/lib/BookApi";
import {useRouter} from "next/router";
import Head from "next/head";

export const getStaticPaths = async () => {
  const bookApi = new BookApi();
  const books = await bookApi.getBooks();
  return {
    paths: books.map(book => ({
      params: {bookId: String(book.id)}
    })),
    /**
     * SSG invalid 대비책
     * false: not found
     *
     * blocking, true 둘다 서버에 생성된 html 페이지 저장, 이 후 SSG 적용
     * 'blocking': SSR + SSG 방식
     * true: SSR + 데이터가 없는 폴백 상태의 페이지부터 반환
     * - fallback 상태
     */
    fallback: false,
  }
}

export const getStaticProps = async ({params}: GetServerSidePropsContext) => {
  const bookApi = new BookApi();
  const book = await bookApi.getBook(Number(params!.bookId));

  if (!book) {
    return {
      notFound: true, // not found 페이지 redirect
    };
  }

  return {
    props: {book}
  };
}

export default function Page(
  {book}: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png"/>
          <meta property="og:title" content="한입북스"/>
          <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요"/>
        </Head>
        <div>Loading...</div>
      </>
    )
  }

  if (!book) return "Error!"

  return (
    <>
      <Head>
        <title>{book.title}</title>
        <meta property="og:image" content={book.coverImgUrl}/>
        <meta property="og:title" content={book.title}/>
        <meta property="og:description" content={book.description}/>
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{backgroundImage: `url(${book.coverImgUrl})`}}
        >
          <img src={book.coverImgUrl}/>
        </div>
        <div className={style.title}>{book.title}</div>
        <div className={style.subTitle}>{book.subTitle}</div>
        <div className={style.authorAndPublisher}>
          {book.author} | {book.publisher}
        </div>
        <div className={style.description}>{book.description}</div>
      </div>
    </>
  );
}

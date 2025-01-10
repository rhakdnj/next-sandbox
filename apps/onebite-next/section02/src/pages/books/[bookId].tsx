import style from "./[bookId].module.css"
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import BookApi from "@/lib/BookApi";

export const getServerSideProps = async ({params}: GetServerSidePropsContext) => {
  const bookApi = new BookApi();
  const bookId = Number(params!.bookId);
  return {
    props: {
      book: await bookApi.getBook(bookId)
    }
  }
}

export default function Page(
  {book}: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  if (!book) return "Error!"

  return <div className={style.container}>
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
  </div>;
}

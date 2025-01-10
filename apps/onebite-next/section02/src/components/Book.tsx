import {IBook} from "@/type";
import Link from "next/link";
import style from "./Book.module.css"

export default function Book(book: IBook) {
  return (
    <Link href={`/books/${book.id}`} className={style.container}>
      <img src={book.coverImgUrl} alt={book.title}/>
      <div>
        <div className={style.title}>{book.title}</div>
        <div className={style.subTitle}>{book.subTitle}</div>
        <br/>
        <div className={style.authorAndPublisher}>
          {book.author} | {book.publisher}
        </div>
      </div>
    </Link>
  )
};

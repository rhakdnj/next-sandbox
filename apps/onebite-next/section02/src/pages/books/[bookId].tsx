import books from "@/mock/books.json";
import style from "./[bookId].module.css"

const book = books[0]

export default function Page() {
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
  </div>
}

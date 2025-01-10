import {ReactNode} from "react";
import SearchableLayout from "@/components/SearchableLayout";
import books from '@/mock/books.json'
import Book from "@/components/Book";

/**
 * @description
 * request parameter 존재 할 때 해당 값을 읽기 위해 해당 컴포넌트를 한번 더 읽는다.
 * 이 때, router.query = {q: "requestParameter" }가 매꿔진다.
 */
export default function Page() {
  return <div>
    {books.map(book => (
      <Book key={book.id} {...book} />
    ))}
  </div>
};


Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

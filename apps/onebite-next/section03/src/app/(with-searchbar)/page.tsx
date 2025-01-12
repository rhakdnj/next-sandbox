import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";

async function AllBooks() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BE_URL}/book`,
        {cache: 'force-cache'}
    );
    if (!res.ok) {
        return <div>오류가 발생했습니다..</div>
    }
    const allBooks: BookData[] = await res.json();

    return <div>
        {allBooks.map((book: BookData) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

async function RecoBooks() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BE_URL}/book/random`,
        {next: {revalidate: 3}}
        // {cache: 'force-cache'},
        // {next: {revalidate: 3}} // 3s. 특정 시간을 주기로 캐시를 업데이트 함
        // {next: {tags: ['books']}} // On-Demand Revalidate 요청이 들어왔을 때 데이터를 최신화 함
    );
    if (!res.ok) {
        return <div>오류가 발생했습니다..</div>
    }
    const randomBooks: BookData[] = await res.json();

    return <div>
        {randomBooks.map((book: BookData) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

export default async function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks/>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks/>
            </section>
        </div>
    );
}

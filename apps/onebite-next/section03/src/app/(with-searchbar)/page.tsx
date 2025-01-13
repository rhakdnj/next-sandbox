import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import {Suspense} from "react";
import {delay} from "@/utils";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

/**
 * 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
 * 1. auto: 기본값, 아무것도 강제하지 않음
 * 2. force-dynamic: 페이지를 강제로 dynamic
 * 3. force-static: 페이지를 강제로 static
 * 4. error: 페이지를 강제로 static 페이지 설정 (설정하면 안되는 이유 -> build 에러)
 */
// export const dynamic = 'auto'
export const dynamic = 'force-dynamic';


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
    await delay(2_000)
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
                <Suspense fallback={<BookListSkeleton count={3}/>}>
                    <RecoBooks/>
                </Suspense>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <Suspense fallback={<BookListSkeleton count={10}/>}>
                    <AllBooks/>
                </Suspense>
            </section>
        </div>
    );
}

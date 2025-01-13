import BookItem from "@/components/book-item";
import {BookData} from "@/types";
import {Suspense} from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

async function SearchResult({q}: { q: string }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BE_URL}/book/search?q=${q}`,
        {cache: 'force-cache'}
    );
    if (!res.ok) {
        return <div>오류가 발생했습니다..</div>
    }
    const books: BookData[] = await res.json();

    return (
        <div>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    )
}

export default async function Page({searchParams}: {
    searchParams: Promise<{
        q?: string;
    }>;
}) {
    const {q} = await searchParams
    return (
        <Suspense
            key={q ?? ""}
            fallback={<BookListSkeleton count={3}/>}
        >
            <SearchResult q={q ?? ""}/>
        </Suspense>
    );
}

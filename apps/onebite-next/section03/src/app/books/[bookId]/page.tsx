import style from "./page.module.css";
import {BookData, ReviewData} from "@/types";
import {notFound} from "next/navigation";
import ReviewItem from "@/components/review-item";
import {ReviewEditor} from "@/components/review-editor";
import Image from "next/image";

/**
 * dynamicParams처럼 export 하여 페이지의 설정을 우리가 갖에로 조정할 수 있는 이러한 기능들을 라우트 세그먼트 옵션이라 부른다.
 */

/**
 * bookId (1,2,3) 이외는 404 NotFound
 */

// export const dynamicParams = false;

/**
 * /books/1, /books/2, /books/3
 * build 시 풀 라우트 캐시 (SSG(HTML) 생성)
 * "path-variable 문자열로만 가능": bookId
 *
 * 이후 다른 bookId는 SSG 형식으로 HTML로 관리됨
 *
 * 이후 BE API 요청하지 않으니 사용하지 않도록 함
 */
export function generateStaticParams() {
    return [{bookId: "1"}, {bookId: "2"}, {bookId: "3"}];
}

async function BookDetail({bookId}: { bookId: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BE_URL}/book/${bookId}`);
    if (!res.ok) {
        if (res.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다..</div>
    }

    const {
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl
    }: BookData = await res.json();

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <Image
                    src={coverImgUrl}
                    width={240}
                    height={300}
                    alt={`도서 ${title}의 표지 이미지`}
                />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

async function ReviewList({bookId}: { bookId: string }) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BE_URL}/review/book/${bookId}`,
        {next: {tags: [`reviews-${bookId}`]}}
        );

    if (!res.ok) {
        throw new Error(`Review fetch failed: ${res.statusText}`)
    }

    const reviews: ReviewData[] = await res.json();

    return (
        <section>
            {reviews.map(v => (
                <ReviewItem key={`review-${v.id}`} {...v} />
            ))}
        </section>
    )
}

export default async function Page({params}: { params: Promise<{ bookId: string }> }) {
    const {bookId} = await params;
    return (
        <div className={style.container}>
            <BookDetail bookId={bookId}/>
            <ReviewEditor bookId={bookId}/>
            <ReviewList bookId={bookId}/>
        </div>
    )
}

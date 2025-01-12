import style from "./page.module.css";
import {BookData} from "@/types";
import {notFound} from "next/navigation";

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

export default async function Page({params}: { params: Promise<{ bookId: string }> }) {
    const {bookId} = await params;
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
        <div className={style.container}>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </div>
    );
}

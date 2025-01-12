import style from "./page.module.css";
import {BookData} from "@/types";

export default async function Page({params}: { params: Promise<{ bookId: string }> }) {
    const {bookId} = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BE_URL}/book/${bookId}`);
    if (!res.ok) {
        return <div>오류가 발생했습니다..</div>
    }
    const {
        id,
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

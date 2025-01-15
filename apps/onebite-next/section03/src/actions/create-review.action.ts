"use server";

import {revalidatePath, revalidateTag} from "next/cache";

export async function createReviewAction(formData: FormData) {
    const bookId = formData.get("bookId")?.toString()
    const content = formData.get("content")?.toString()
    const author = formData.get("author")?.toString()

    if (!bookId || !content || !author) {
        return;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BE_URL}/review`, {
            method: "POST",
            body: JSON.stringify({bookId, content, author,})
        })
        /**
         * ServerComponent 에서만 호출 가능.
         * - fetch 데이터 캐시 무효화
         * - 풀 라우트 캐시도 무효화
         *
         * 1. 특정 주소의 해당하는 페이지만 재검증
         * revalidatePath(`/books/${bookId}`)
         */

        /**
         * 2. 특정 경로의 모든 동적 페이지를 재검증
         *
         * revalidatePath("/books/[bookId]", "page")
         */

        /**
         * 3. 특정 레이아웃을 갖는 모든 페이지 재검증
         *
         * revalidatePath("/(with-searchbar)", "layout")
         */

        /**
         * 4. 모든 데이터 재검증
         * revalidatePath("/", "layout")
         */

        /**
         * 5. 태그 기준
         *
         * context-before: await fetch("리뷰 목록 조회", {next: {tags: [`review-${bookId}`] } })
         */
        revalidateTag(`review-${bookId}`)
    } catch (error) {
        console.error(error)
        return;
    }
}

"use server";

import {revalidatePath, revalidateTag} from "next/cache";

export async function createReviewAction(_: unknown, formData: FormData) {
    // _: state
    const bookId = formData.get("bookId")?.toString()
    const content = formData.get("content")?.toString()
    const author = formData.get("author")?.toString()

    if (!bookId || !content || !author) {
        return {
            status: false,
            error: "리뷰 내용과 작성자를 입력해주세요."
        }
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
        if (!res.ok) {
            throw new Error(res.statusText)
        }

        revalidateTag(`reviews-${bookId}`);
        return {
            status: true,
            error: ""
        }
    } catch (error) {
        return {
            status: false,
            error: `리뷰 저장에 실패했습니다. ${error}`
        }
    }
}

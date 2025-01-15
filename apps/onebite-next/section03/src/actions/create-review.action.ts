"use server";

import {revalidatePath} from "next/cache";

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
         */
        revalidatePath(`/books/${bookId}`)
    } catch (error) {
        console.error(error)
        return;
    }
}

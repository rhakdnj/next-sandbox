"use server";

import {revalidateTag} from "next/cache";

export async function deleteReviewAction(
    _: unknown,
    formData: FormData
) {
    const reviewId = formData.get("reviewId")?.toString()
    const bookId = formData.get("bookId")?.toString()
    if (!reviewId) {
        return {
            status: false,
            error: "삭제할 리뷰가 없습니다."
        }
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BE_URL}/review/${reviewId}`,
            {method: "DELETE"},
        );

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

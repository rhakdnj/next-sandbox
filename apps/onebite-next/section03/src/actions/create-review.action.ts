"use server";

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

        console.log(res.status)
    } catch (error) {
        console.error(error)
        return;
    }
}

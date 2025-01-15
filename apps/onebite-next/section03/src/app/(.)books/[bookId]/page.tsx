// https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes

// , 해당 경로
// [..] 상위 경로
// [..][..] 상위 상위 경로
// [...] app path

import BookPage from "@/app/books/[bookId]/page";
import Modal from "@/components/modal";


export default function Page(props: any) {
    return (
        <div>
            가로채기 성공!
            <Modal>
                <BookPage {...props}/>
            </Modal>
        </div>
    )
};

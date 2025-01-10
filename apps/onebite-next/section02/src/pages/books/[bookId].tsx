import {useRouter} from "next/router";

export default function Page() {
  const router = useRouter()

  const {bookId} = router.query

  return <h1>Book : {bookId}</h1>
}

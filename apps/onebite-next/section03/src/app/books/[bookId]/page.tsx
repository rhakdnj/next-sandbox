export default async function Page({params}: {
  params: Promise<{ bookId: string }>
}) {
  const {bookId} = await params

  return (
    <div>bookId {bookId}</div>
  )
}

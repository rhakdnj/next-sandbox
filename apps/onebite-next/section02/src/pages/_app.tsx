import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function App({Component, pageProps}: AppProps) {

  const router = useRouter()

  const onClickButton = () => {
    /**
     * push: url로 페이지 이동
     * replace: 뒤로가기를 방지하며 페이지 이동
     * back: 페이지를 뒤로 이동
     */
    router.push("/test")
  }

  /**
   * Link 경로는 preFetching 대상
   * 그러나 ES로 router 로 페이지 이동은 preFetching 대상이 아님
   */
  useEffect(() => {
    router.prefetch("/test")
  }, [])

  return (
    <>
      <header>
        {/*
          * Link 경로는 preFetching 대상이기에 해당 Js Bundle을 가져온다.
          */}
        <Link href="/">index</Link>
        &nbsp;
        {/*
          * Link 경로 preFetching 해제 (search 페이지 이동 적을 것 같음)
          */}
        <Link href="/search" prefetch={false}>search</Link>
        &nbsp;
        <Link href="/books/1">books/1</Link>

        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>);
}

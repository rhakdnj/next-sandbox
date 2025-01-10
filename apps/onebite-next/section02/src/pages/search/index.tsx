import {useRouter} from "next/router";
import {ReactNode} from "react";
import SearchableLayout from "@/components/SearchableLayout";
import Home from "@/pages";

/**
 * @description
 * request parameter 존재 할 때 해당 값을 읽기 위해 해당 컴포넌트를 한번 더 읽는다.
 * 이 때, router.query = {q: "requestParameter" }가 매꿔진다.
 */
export default function Page() {
  const router = useRouter();

  const {q} = router.query

  return <h1>검색: {q}</h1>;
};


Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

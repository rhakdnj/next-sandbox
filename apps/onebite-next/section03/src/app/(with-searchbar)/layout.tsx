import {ReactNode} from "react";
import Searchbar from "@/app/(with-searchbar)/searchbar";

/**
 * search 하위의 경로에 모두 적용됨
 * /search
 * /search/setting
 */
export default function layout({
                                 children
                               }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  )
}

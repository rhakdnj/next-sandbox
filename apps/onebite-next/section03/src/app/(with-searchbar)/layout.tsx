import {ReactNode} from "react";

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
      <div>임시 서치바</div>
      {children}
    </div>
  )
}

import {ReactNode, Suspense} from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div>
            {/* Suspense : 사전 렌더링 베제, 클라이언트 컴포넌트 설정*/}
            <Suspense fallback={<div>Loading...</div>}>
                <Searchbar/>
            </Suspense>
            {children}
        </div>
    );
}

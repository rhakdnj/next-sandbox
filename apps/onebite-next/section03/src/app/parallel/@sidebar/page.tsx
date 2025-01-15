// @sidebar(슬롯): 병렬로 렌더링 될 페이지 컴포넌트를 보관하는 폴더
// parallel setting 이 없기에 이전 페이지가 그대로 유지 된다.
// URI로 parallel setting 접근하면 404
export default function Page() {
    return (
        <div>
            @sidebar
        </div>
    )
};

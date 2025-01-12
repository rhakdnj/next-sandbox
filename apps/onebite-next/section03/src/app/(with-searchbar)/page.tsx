/**
 * 리액트 훅을 쓰려면, 파일에 use-client 명시가 필요
 * "use client"
 * useEffect(() => {})
 *
 */
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.page}>인덱스 페이지</div>
  );
}

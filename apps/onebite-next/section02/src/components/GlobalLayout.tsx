import {ReactNode} from "react";
import Link from "next/link";
import style from "./GlobalLayout.module.css"

export default function GlobalLayout({children}: {
  children: ReactNode
}) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📚One bite books</Link>
      </header>
      <main className={style.main}>
        {children}
      </main>
      <footer className={style.footer}>
        Next.js
      </footer>
    </div>
  );
};

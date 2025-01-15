import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import {ReactNode} from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <div className={style.container}>
            <header>
                <Link href={"/"}>📚 ONEBITE BOOKS</Link>
            </header>
            <main>{children}</main>
            <footer>제작 @winterlood</footer>
        </div>
        <div id="modal-root"></div>
        </body>
        </html>
    );
}

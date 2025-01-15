"use client";

import {ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import style from "./modal.module.css"
import {useRouter} from "next/navigation";

export default function Modal({children}: { children: ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal()
            dialogRef.current?.scrollTo({
                top: 0
            })
        }
    }, [])

    return createPortal(
        <dialog
            // ESC -> 뒤로가기
            onClose={() => router.back()}
            onClick={e => {
                // 모달의 배경이 클릭이 된거면 -> 뒤로가기
                if ((e.target as any).nodeName === 'DIALOG') {
                    router.back()
                }
            }}
            className={style.modal}
            ref={dialogRef}>
            {children}
        </dialog>,
        document.getElementById("modal-root") as HTMLElement
    )
}

"use client"

import { useRef, useState } from "react"
import { ConfirmDialog } from "../components/ConfirmDialog"

type Config = {
    title: string
    description?: string
    summary: React.ReactNode
    confirmText?: string
    cancelText?: string
    danger?: boolean
}

export function useConfirmSelection() {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const resolverRef = useRef<(value: boolean) => void>(undefined)
    const [config, setConfig] = useState<Config | null>(null)

    function confirmSelection(cfg: Config) {
        setConfig(cfg)

        return new Promise<boolean>((resolve) => {
            resolverRef.current = resolve
            requestAnimationFrame(() => {
                dialogRef.current?.showModal()
            })
        })
    }

    function close(result: boolean) {
        dialogRef.current?.close()
        resolverRef.current?.(result)
        resolverRef.current = undefined
        setConfig(null)
    }

    const dialog = config ? (
        <ConfirmDialog
            ref={dialogRef}
            title={config.title}
            description={config.description}
            summary={config.summary}
            confirmText={config.confirmText}
            cancelText={config.cancelText}
            danger={config.danger}
            onConfirm={() => close(true)}
            onCancel={() => close(false)}
        />
    ) : null

    return { confirmSelection, dialog }
}

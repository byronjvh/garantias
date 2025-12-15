"use client"

import { forwardRef } from "react"

type Props = {
    title: string
    description?: string
    summary: React.ReactNode
    confirmText?: string
    cancelText?: string
    danger?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmDialog = forwardRef<
    HTMLDialogElement,
    Props
>(function ConfirmSelectionDialog(
    {
        title,
        description,
        summary,
        confirmText = "Confirmar",
        cancelText = "Cancelar",
        danger,
        onConfirm,
        onCancel,
    },
    ref
) {
    return (
        <dialog
            ref={ref}
            onCancel={onCancel}
            className="rounded-xl p-6 backdrop:bg-black/40 max-w-md w-[90vw]"
        >
            <h2 className="text-lg font-semibold">{title}</h2>

            {description && (
                <p className="mt-2 text-sm text-gray-600">
                    {description}
                </p>
            )}

            <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                {summary}
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="rounded-lg border px-4 py-2 text-sm"
                >
                    {cancelText}
                </button>

                <button
                    onClick={onConfirm}
                    className={`rounded-lg px-4 py-2 text-sm text-white ${danger ? "bg-red-600" : "bg-black"
                        }`}
                >
                    {confirmText}
                </button>
            </div>
        </dialog>
    )
})

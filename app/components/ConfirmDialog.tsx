"use client";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    open,
    title = "¿Estás seguro?",
    description = "Esta acción no se puede deshacer.",
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onCancel} 
        >
            <div
                className="w-full max-w-sm rounded-md bg-card-bg p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()} 
            >
                <h3 className="font-title text-lg font-bold mb-2">
                    {title}
                </h3>

                <p className="text-sm opacity-80 mb-6">
                    {description}
                </p>

                <div className="flex justify-end gap-3">
                    <SecondaryButton
                        onClick={onCancel}
                        className="py-2"
                    >
                        Cancelar
                    </SecondaryButton>

                    <PrimaryButton
                        onClick={onConfirm}
                        className="py-2"
                    >
                        Aceptar
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Info } from "lucide-react";
import PrimaryButton from "./PrimaryButton";

interface InfoDialogProps {
    open: boolean;
    handleOpen: Function;
    className?: string;
    disclaimer?: string;
    children: React.ReactNode
}

export function InfoDialog({
    open,
    handleOpen,
    className,
    disclaimer,
    children
}: InfoDialogProps) {
    if (!open) return null;

    const handleCancel = () => {
        handleOpen(false)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={handleCancel} 
        >
            <div
                className="w-full max-w-md rounded-md bg-card-bg p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className={className}>
                    {children}
                </div>

                <div className="flex justify-between gap-3 mt-4">
                    {
                        disclaimer && (
                            <p className="text-sm flex gap-1 items-center opacity-80"><span><Info className="text-current" size={18} /></span>{disclaimer}</p>
                        )
                    }
                    <PrimaryButton
                        onClick={handleCancel}
                        className="py-2 px-10"
                    >
                        Listo
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

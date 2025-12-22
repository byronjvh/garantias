"use client";

import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function SecondaryButton({
    children,
    onClick,
    loading = false,
    disabled,
    className = "",
    ...props
}: PrimaryButtonProps) {
    return (
        <button
            {...props}
            onClick={onClick}
            disabled={disabled || loading}
            className={`relative rounded px-4 py-2 font-semibold transition-colors
                bg-accent text-white hover:bg-accent/90 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}`}
        >
            <span className={`flex items-center gap-1 ${loading ? "opacity-0" : "opacity-100"}`}>
                {children}
            </span>

            {loading && (
                <span className="absolute inset-0 flex items-center justify-center text-sm">
                    Cargando…
                </span>
            )}
        </button>
    );
}

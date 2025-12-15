"use client";

import { useState } from "react";

export function useConfirm() {
    const [open, setOpen] = useState(false);
    const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

    function confirm(action: () => void) {
        setOnConfirm(() => action);
        setOpen(true);
    }

    function handleConfirm() {
        onConfirm?.();
        setOpen(false);
        setOnConfirm(null);
    }

    function handleCancel() {
        setOpen(false);
        setOnConfirm(null);
    }

    return {
        open,
        confirm,
        handleConfirm,
        handleCancel,
    };
}

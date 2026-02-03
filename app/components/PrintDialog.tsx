"use client";
import { Printer } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";

export const DOCUMENT_TYPE = {
    INGRESO: "INGRESO",
    INGRESO_AMPLIADO: "INGRESO_AMPLIADO",
    ENTREGA: "ENTREGA"
}

export type DocumentType =
    typeof DOCUMENT_TYPE[keyof typeof DOCUMENT_TYPE];

interface PrintDialogProps {
    open: boolean;
    handleOpen: Function;
    className?: string;
    loading: boolean;
    onPrint?: () => void;
    updateType?: (type: DocumentType) => void;
    children: React.ReactNode
}

export function PrintDialog({
    open,
    handleOpen,
    className,
    onPrint,
    loading,
    updateType,
    children
}: PrintDialogProps) {
    const [documentType, setDocumentType] = useState<DocumentType>(DOCUMENT_TYPE.INGRESO)
    if (!open) return null;

    const handleCancel = () => {
        handleOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value
        setDocumentType(newType)
        if (updateType) updateType(newType)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={handleCancel}
        >
            <div
                className="flex gap-4 rounded-md bg-card-bg p-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="pdf-column">
                    <div className={className}>
                        {children}
                    </div>
                </div>
                <span className="w-px bg-gray-200"></span>
                <div className="flex flex-col gap-4 py-8 max-w-[300px]">
                    <h2 className="text-title-color text-xl font-title font-semibold">Boleta de Ingreso</h2>
                    <label htmlFor="document-type" className="text-sm text-p-color">Seleccione el tipo de documento a imprimir</label>
                    <select value={documentType} onChange={handleChange} name="document-type" id="document-type" className="border border-gray-400/60 p-2 rounded">
                        {Object.entries(DOCUMENT_TYPE).map(([tipo, label]) => (
                            <option key={tipo} value={tipo}>
                                {
                                    label
                                        .toLowerCase()
                                        .split("_")
                                        .map(word => word[0].toUpperCase() + word.slice(1))
                                        .join(" ")
                                }
                            </option>
                        ))}
                    </select>
                    {
                        onPrint && (
                            <PrimaryButton
                                onClick={() => onPrint()}
                                className="flex justify-center"
                                loading={loading}
                            >
                                <Printer size={20} />
                                Imprimir
                            </PrimaryButton>
                        )
                    }
                    <p className="text-p-color text-xs text-balance">
                        El documento se imprimirá en tamaño carta (8.5 × 11 in)
                    </p>
                </div>
            </div>
        </div>
    );
}

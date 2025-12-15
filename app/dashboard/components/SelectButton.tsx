import { Sucursal } from "@/types"
import { Check } from "lucide-react"
import { MouseEventHandler, useState } from "react"

interface Props {
    sucursal: Sucursal,
    selectedId: number | null,
    onSelect: (id: number) => void
}

export default function SelectButton({ sucursal, selectedId, onSelect }: Props) {
    const selected = selectedId === sucursal.id

    return (
        <button
            className={`flex flex-1 items-center justify-between cursor-pointer rounded border p-4 transition-colors 
                ${selected
                    ? "border-accent-2"
                    : "border-gray-300 hover:bg-gray-50 "
                }`}
            onClick={() => onSelect(sucursal.id)}
        >
            <span className={`font-medium ${selected ? "text-accent-2" : ""}`}>
                {sucursal.nombre}
            </span>

            {selected && <span className="text-accent"><Check /></span>}
        </button>
    )
}
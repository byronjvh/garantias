"use client"


import { humanizeEstadoGarantia } from "@/app/utils/humanizeEstadoGarantia";
import { EstadoGarantia, ESTADOS_GARANTIA } from "@/types/types";
import { useEffect, useState } from "react"

export const ESTADO_GARANTIA_STYLE: Record<EstadoGarantia, string> = {
    INGRESADA: "bg-amber-50 text-amber-800 border-amber-600",
    EN_REVISION_SUCURSAL: "bg-sky-50 text-sky-800 border-sky-600",
    ESCALADA_A_CEDI: "bg-violet-50 text-violet-800 border-violet-600",
    EN_REVISION_CEDI: "bg-blue-50 text-blue-800 border-blue-600",
    ENVIADA_A_PROVEEDOR: "bg-orange-50 text-orange-800 border-orange-600",
    ESPERANDO_REPUESTO: "bg-yellow-50 text-yellow-800 border-yellow-600",
    EN_REPARACION: "bg-indigo-50 text-indigo-800 border-indigo-600",
    DEVUELTA_A_SUCURSAL: "bg-cyan-50 text-cyan-800 border-cyan-600",
    LISTA_PARA_RETIRO: "bg-lime-50 text-lime-800 border-lime-600",
    RECHAZADA: "bg-red-50 text-red-800 border-red-600",
    RESUELTA: "bg-emerald-50 text-emerald-800 border-emerald-600",
};

export const ESTADO_GARANTIA_OPTION_STYLE: Record<EstadoGarantia, string> = {
    INGRESADA: "text-amber-800",
    EN_REVISION_SUCURSAL: "text-sky-800",
    ESCALADA_A_CEDI: "text-violet-800",
    EN_REVISION_CEDI: "text-blue-800",
    ENVIADA_A_PROVEEDOR: "text-orange-800",
    ESPERANDO_REPUESTO: "text-yellow-800",
    EN_REPARACION: "text-indigo-800",
    DEVUELTA_A_SUCURSAL: "text-cyan-800",
    LISTA_PARA_RETIRO: "text-lime-800",
    RECHAZADA: "text-red-800",
    RESUELTA: "text-emerald-800",
};




interface WarrantyStatusProps {
    estado: EstadoGarantia;
    onChange?: (estado: EstadoGarantia) => void;
    disabled?: boolean;
    className?: string
}
export default function WarrantyStatus({
    estado,
    onChange,
    disabled = false,
    className
}: WarrantyStatusProps) {
    const [currentEstado, setCurrentEstado] = useState<EstadoGarantia>(estado);

    useEffect(() => {
        setCurrentEstado(estado);
    }, [estado]);

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const nuevoEstado = e.target.value as EstadoGarantia;
        setCurrentEstado(nuevoEstado);
        onChange?.(nuevoEstado);
    }

    return (
        <select
            value={currentEstado}
            onChange={handleChange}
            disabled={disabled}
            className={`
                appearance-none
                border
                rounded-full
                text-xs
                px-2
                py-1
                cursor-pointer
                focus:outline-none
                transition
                ${ESTADO_GARANTIA_STYLE[currentEstado]}
                ${disabled ? "opacity-60 cursor-not-allowed" : ""} 
                 ${className}
            `}
        >
            {ESTADOS_GARANTIA.map((estado) => (
                <option key={estado} value={estado} className={`${ESTADO_GARANTIA_OPTION_STYLE[estado]} bg-white`}>
                    ● {humanizeEstadoGarantia(estado)}
                </option>
            ))}
        </select>
    );
}
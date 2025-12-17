"use client"


import { humanizeEstadoGarantia } from "@/app/utils/humanizeEstadoGarantia";
import { EstadoGarantia, ESTADOS_GARANTIA } from "@/types";
import { useEffect, useState } from "react"

export const ESTADO_GARANTIA_STYLE: Record<
    EstadoGarantia,
    string
> = {
    INGRESADA: "bg-yellow-50 text-yellow-800 border-yellow-600",
    EN_REVISION_SUCURSAL: "bg-blue-50 text-blue-800 border-blue-600",
    ESCALADA_A_CEDI: "bg-purple-50 text-purple-800 border-purple-600",
    EN_REVISION_CEDI: "bg-indigo-50 text-indigo-800 border-indigo-600",
    ENVIADA_A_PROVEEDOR: "bg-orange-50 text-orange-800 border-orange-600",
    ESPERANDO_REPUESTO: "bg-orange-50 text-orange-800 border-orange-600",
    EN_REPARACION: "bg-orange-50 text-orange-800 border-orange-600",
    DEVUELTA_A_SUCURSAL: "bg-teal-50 text-teal-800 border-teal-600",
    LISTA_PARA_RETIRO: "bg-green-50 text-green-800 border-green-600",
    RECHAZADA: "bg-red-50 text-red-800 border-red-600",
    RESUELTA: "bg-emerald-50 text-emerald-800 border-emerald-600",

};


interface WarrantyStatusProps {
    estado: EstadoGarantia;
    onChange?: (estado: EstadoGarantia) => void;
    disabled?: boolean;
}
export default function WarrantyStatus({
    estado,
    onChange,
    disabled = false,
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
            `}
        >
            {ESTADOS_GARANTIA.map((estado) => (
                <option key={estado} value={estado} className="bg-white text-title-color">
                    {humanizeEstadoGarantia(estado)}
                </option>
            ))}
        </select>
    );
}
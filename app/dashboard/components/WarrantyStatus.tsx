"use client"

import { Status, StatusKey } from "@/types";
import { useEffect, useState } from "react"

export const STATUSES = {
    pending: "pending",
    diagnosis: "diagnosis",
    processing: "processing",
    denied: "denied",
    resolved: "resolved"
} as const

const STYLE: Record<StatusKey, string> = {
    pending: "border-yellow-600 text-yellow-800 bg-yellow-50",
    diagnosis: "border-blue-600 text-blue-800 bg-blue-50",
    processing: "border-orange-600 text-orange-800 bg-orange-50",
    denied: "border-red-600 text-red-800 bg-red-50",
    resolved: "border-green-600 text-green-800 bg-green-50",
}

interface WarrantyStatusProps {
    status: Status;
}

export default function WarrantyStatus({ status }: WarrantyStatusProps) {
    const [currentStatus, setCurrentStatus] = useState<Status>(STATUSES.pending);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value as StatusKey;
        setCurrentStatus(STATUSES[key]);
    };

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    return (
        <select value={currentStatus} onChange={handleChange} className={`appearance-none border rounded-full text-xs px-1.5 py-1 focus:outline-0 cursor-pointer ${STYLE[currentStatus as StatusKey]}`} id="warranty-status">
            <option value="pending" className="bg-white text-title-color">🟡 Pendiente </option>
            <option value="diagnosis" className="bg-white text-title-color">🔵 En Diagnóstico </option>
            <option value="proccesing" className="bg-white text-title-color">🟠 En Proceso </option>
            <option value="denied" className="bg-white text-title-color">🔴 Denegada </option>
            <option value="resolved" className="bg-white text-title-color">🟢 Resuelto </option>
        </select>
    )
} 
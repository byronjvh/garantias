"use client"

import { useState } from "react"

const STATUSES = {
    pending: "pending",
    diagnosis: "diagnosis",
    proccesing: "proccesing",
    denied: "denied",
    resolved: "resolved"
} as const

type StatusKey = keyof typeof STATUSES;
export type Status = (typeof STATUSES)[keyof typeof STATUSES];

const STYLE = {
    pending: "border-yellow-600 text-yellow-800 bg-yellow-50",
    diagnosis: "border-blue-600 text-blue-800 bg-blue-50",
    proccesing: "border-orange-600 text-orange-800 bg-orange-50",
    denied: "border-red-600 text-red-800 bg-red-50",
    resolved: "border-green-600 text-green-800 bg-green-50",
}

export default function WarrantyStatus() {
    const [status, setStatus] = useState<Status>(STATUSES.pending)
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value.toLowerCase() as StatusKey;
        setStatus(STATUSES[key]);
    };


    return (
        <select onChange={handleChange} className={`appearance-none border rounded-full text-xs px-1.5 py-1 focus:outline-0 cursor-pointer ${STYLE[status as StatusKey]}`} id="warranty-status">
            <option value="pending" className="bg-white text-title-color">🟡 Pendiente </option>
            <option value="diagnosis" className="bg-white text-title-color">🔵 En Diagnóstico </option>
            <option value="proccesing" className="bg-white text-title-color">🟠 En Proceso </option>
            <option value="denied" className="bg-white text-title-color">🔴 Denegada </option>
            <option value="resolved" className="bg-white text-title-color">🟢 Resuelto </option>
        </select>
    )
} 
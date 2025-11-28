"use client"
import { useEffect, useState } from "react";
import garantiasJson from "../../../GuaranteesExamples.json"; // requiere "resolveJsonModule": true en tsconfig
import { Pencil, Trash2 } from "lucide-react";
import WarrantyStatus from "../components/WarrantyStatus";
import type { Warranty } from "../../../types";
import Link from "next/link";


export default function GarantiasPage() {
    const [warrantyList, setWarrantyList] = useState<Warranty[]>();
    useEffect(() => {
        setWarrantyList(garantiasJson as Warranty[]);
    }, [])

    return (
        <>
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-title font-bold text-lg">Lista de garantías</h1>
                    <a href="" className="bg-accent px-3 py-2 text-sm font-bold text-white hover:brightness-110 ease-out transition-all duration-200 rounded"> Crear Nueva </a>
                </div>
                <div className="flex justify-between bg-card-bg p-2 rounded text-sm border border-gray-300">
                    <select id="filter-select">
                        <option value="">Filtrar por... </option>
                    </select>
                </div>
            </header>
            <ul className="bg-card-bg flex flex-col gap-4 p-2 py-4 rounded border border-gray-300">
                {
                    warrantyList?.map((warranty) => (
                        <li key={warranty.id}>
                            <article className="p-2 grid grid-cols-[minmax(100px,340px)_1fr_1fr_1fr] gap-2 text-sm">
                                <div className="flex flex-col justify-center w-full max-w-[340px] gap-0.5 ">
                                    <Link href={`/dashboard/garantias/${warranty.id}`}>
                                        <h4 className="font-bold text-accent-2">{warranty.nombre}</h4>
                                        <p className="text-xs ">{warranty.descripcion_corta}</p>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center">
                                    <WarrantyStatus status={warranty.status} />
                                </div>
                                <p className="flex items-center justify-center">{warranty.fecha} </p>
                                <div className="flex items-center justify-end gap-2">
                                    <button className="bg-accent p-1 text-white rounded cursor-pointer"><Pencil size={18} /></button>
                                    <button className="bg-red-500 p-1 text-white rounded cursor-pointer"><Trash2 size={18} /></button>
                                </div>
                            </article>
                        </li>
                    ))
                }

            </ul>
        </>
    );
}

"use client"
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useDashboard } from "../DashboardContext";
import WarrantyStatus from "../components/WarrantyStatus";
import { EstadoGarantia } from "@/types";


export default function GarantiasPage() {
    const { garantias } = useDashboard()
    return (
        <>
            <header className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="font-title font-bold text-lg">Garantías de tiendas</h1>
                    <PrimaryButton>
                        Crear Nueva
                    </PrimaryButton>
                </div>
                <div className="flex justify-between bg-card-bg p-2 rounded text-sm border border-gray-300">
                    <select id="filter-select">
                        <option value="">Filtrar por... </option>
                    </select>
                </div>
            </header>
            <ul className="bg-card-bg flex flex-col gap-4 p-2 py-4 rounded border border-gray-300">
                {
                    garantias?.map((garantia) => (
                        <li key={garantia.id}>
                            <article className="p-2 grid grid-cols-[minmax(100px,340px)_1fr_1fr_1fr] gap-2 text-sm">
                                <div className="flex flex-col justify-center w-full max-w-[340px] gap-0.5 ">
                                    <Link href={`/dashboard/garantias/${garantia.id}`}>
                                        <h4 className="font-bold text-accent-2">{garantia.contacto.nombre}</h4>
                                        <p className="text-xs ">{garantia.resumen}</p>
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center">
                                    <WarrantyStatus estado={garantia.estadoActual} />
                                </div>
                                <p className="flex items-center justify-center">{garantia.fechaIngreso.toLocaleDateString("es-CR")} </p>
                                <div className="flex items-center justify-end gap-2">
                                    <button className="bg-accent p-1 text-white rounded cursor-pointer"><Pencil size={20} /></button>
                                    <button className="bg-red-500 p-1 text-white rounded cursor-pointer"><Trash2 size={20} /></button>
                                </div>
                            </article>
                        </li>
                    ))
                }

            </ul>
        </>
    );
}

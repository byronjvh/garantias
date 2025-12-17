"use client"
import Link from "next/link";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useDashboard } from "../DashboardContext";
import WarrantyStatus from "../components/WarrantyStatus";


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
                <div className="flex gap-4 bg-card-bg p-4 rounded text-sm border border-gray-300">
                    <input className="w-5 h-5" type="checkbox" name="selectAll" id="selectAll" />
                    <select id="filter-select">
                        <option value="">Filtrar por... </option>
                    </select>
                </div>
            </header>
            <ul className="bg-card-bg flex flex-col gap-4 p-2 py-4 rounded border border-gray-300">
                {
                    garantias?.map((garantia) => (
                        <li key={garantia.id}>
                            <article className="p-2 grid grid-cols-[repeat(2,max-content)_minmax(100px,340px)_repeat(4,1fr)] gap-4 text-sm items-center place-items-center">
                                <div>
                                    <input className="w-5 h-5" type="checkbox" name="selectWarranty" id="selectWarranty" />
                                </div>
                                <p className="">{garantia.consecutivo}</p>
                                <div className="w-full max-w-[340px] gap-0.5 ">
                                    <Link href={`/dashboard/garantias/${garantia.id}`}>
                                        <h4 className="font-bold text-accent-2">{garantia.contacto.nombre}</h4>
                                        <p className=" ">{garantia.resumen}</p>
                                    </Link>
                                </div>
                                <p>{garantia.producto.descripcion}</p>
                                <p>{garantia.sucursal.nombre}</p>
                                <div className="">
                                    <WarrantyStatus estado={garantia.estadoActual} />
                                </div>
                                <p className="">{garantia.fechaIngreso.toLocaleDateString("es-CR")} </p>
                            </article>
                        </li>
                    ))
                }

            </ul>
        </>
    );
}

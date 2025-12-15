import { redirect } from "next/navigation";
import { getSucursales } from "../../lib/db/getSucursales";
import { BuildingStorefrontIcon } from "@heroicons/react/16/solid";
import { Info } from "lucide-react";

export default async function DashboardHome() {
    const sucursales = await getSucursales()
    console.log(sucursales)

    return (
        <div className="mt-4 flex flex-col w-full max-w-lg gap-6 bg-card-bg mx-auto p-6 py-8 rounded-md shadow-2xl shadow-black/10">
            <h3 className="font-title text-title-color font-bold">Elige tu sucursal:</h3>
            <ul className="flex flex-col w-full gap-3">
                {sucursales.map((sucursal) => (
                    <li className="inline-flex" key={sucursal.id}>
                        <button
                            className="flex flex-1 items-center justify-between cursor-pointer rounded border p-4 transition border-gray-300 hover:bg-gray-50"
                        >
                            <span className="font-medium">
                                {sucursal.nombre}
                            </span>

                            <span className="text-accent font-bold">✓</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-between gap-2">
                <p className="text-sm flex gap-1 items-center opacity-80"><span><Info className="text-current" size={18} /></span>Define dónde se registran las garantías</p>
                <button
                    className="rounded px-4 py-3 font-semibold transition bg-accent text-white hover:bg-accent/90"
                >
                    Continuar
                </button>
            </div>

        </div>
    )

    redirect("/dashboard/garantias");
}
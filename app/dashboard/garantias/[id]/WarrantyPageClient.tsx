// app/dashboard/garantias/[id]/WarrantyPageClient.tsx
"use client";

import Warranty from "./components/Warranty"
import PrimaryButton from "@/app/components/PrimaryButton"
import { useState } from "react"
import { GarantiaDetails } from "@/types/garantiaDetails"
import { Printer } from "lucide-react";
import WarrantyStatus from "../../components/WarrantyStatus";
import SecondaryButton from "@/app/components/SecondaryButton";
import { TipoProducto } from "@/types/types";

type Props = {
    garantia: GarantiaDetails;
};

export default function WarrantyPageClient({ garantia }: Props) {
    const [loading, setLoading] = useState(false);

    const descargarPDF = async () => {
        setLoading(true);

        const sheet = document.getElementById("pdf");
        if (!sheet) return;

        const html2pdf = (await import("html2pdf.js")).default;

        const opt = {
            filename: `Garantía_${garantia.contacto.nombre}.pdf`,
            image: { type: "webp" as const, quality: 1 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const }
        };

        html2pdf()
            .set(opt)
            .from(sheet)
            .outputPdf("bloburl")
            .then(url => window.open(url))
            .finally(() => setLoading(false));
    };

    const producto = garantia.producto

    return (
        <div className="mx-auto w-full max-w-[800px] flex flex-col gap-4 bg-card-bg p-4 border border-gray-400/60 rounded shadow-lg/5">

            {/* HEADER */}
            <header className="flex items-center justify-between rounded-md bg-card-bg p-4 border border-gray-400/60">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800">
                        Caso {garantia.consecutivo}
                    </h1>
                    <p className="text-sm text-slate-500">
                        Ingresado el {garantia.fechaIngreso.toLocaleDateString("es-CR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })} {garantia.fechaIngreso.toLocaleTimeString("es-CR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })} · {garantia.sucursalIngreso.nombre}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <WarrantyStatus estado={garantia.estadoActual} />
                    <SecondaryButton>
                        <Printer size={20} /> Imprimir
                    </SecondaryButton>
                    <PrimaryButton>
                        Editar
                    </PrimaryButton>
                </div>
            </header>

            {/* RESUMEN */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Cliente */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 text-sm font-semibold text-slate-700">
                        Cliente
                    </h3>
                    <p className="text-sm text-slate-800">{garantia.contacto.nombre}</p>
                    <p className="text-sm text-slate-500">{garantia.contacto.telefono}</p>
                    <p className="text-sm text-slate-500">{garantia.contacto.correo}</p>
                </div>

                {/* Producto */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 text-sm font-semibold text-slate-700">
                        Producto
                    </h3>
                    <p className="text-sm text-slate-800">
                        {garantia.producto.caracteristicas.descripcion}
                    </p>
                    <p className="text-sm text-slate-500">
                        {garantia.producto.caracteristicas.serie}
                    </p>
                    <button>Ver ficha</button>
                </div>

                {/* Falla */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 text-sm font-semibold text-slate-700">
                        Resumen
                    </h3>
                    <p className="text-sm text-slate-800 line-clamp-3">
                        {garantia.resumen}
                    </p>
                </div>
            </div>

            {/* TABS */}
            <div className="rounded-md bg-card-bg border border-gray-400/60">
                <div className="flex border-b">
                    <button className="border-b-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600">
                        Detalle
                    </button>
                    <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        Reporte técnico
                    </button>
                    <button className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        Historial
                    </button>
                </div>

                {/* CONTENIDO TAB */}
                <div className="p-4 space-y-4">
                    {/* Detalle */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-slate-500">Problema reportado</p>
                            <p className="text-sm text-slate-800">
                                {garantia.descripcion}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Factura</p>
                            <p className="text-sm text-slate-800">{garantia.factura}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Estado físico y anotaciones</p>
                            <p className="text-sm text-slate-800">
                                {garantia.producto.caracteristicas.estadoFisico}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Accesorios</p>
                            <p className="text-sm text-slate-800">
                                {producto.caracteristicas.accesorios}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

// app/dashboard/garantias/[id]/WarrantyPageClient.tsx
"use client";

import PrimaryButton from "@/app/components/PrimaryButton"
import { useState } from "react"
import { GarantiaDetails } from "@/types/garantiaDetails"
import { ArrowRight, Printer } from "lucide-react";
import WarrantyStatus, { ESTADO_GARANTIA_OPTION_STYLE, } from "../../components/WarrantyStatus";
import SecondaryButton from "@/app/components/SecondaryButton";
import { humanizeEstadoGarantia } from "@/app/utils/humanizeEstadoGarantia";
import { InfoDialog } from "@/app/components/InfoDialog";
import { TipoProducto } from "@/types/types";
import WarrantyReceipt from "./components/WarrantyReceipt";
import { DOCUMENT_TYPE, DocumentType, PrintDialog } from "@/app/components/PrintDialog";

type Props = {
    garantia: GarantiaDetails;
};

export default function WarrantyPageClient({ garantia }: Props) {
    const [loading, setLoading] = useState(false);
    const [tabOption, setTabOption] = useState(0)
    const [openSpecs, setOpenSpecs] = useState(false)
    const [openPrint, setOpenPrint] = useState(false)
    const [documentType, setDocumentType] = useState<DocumentType>(DOCUMENT_TYPE.INGRESO)


    const handleOpenSpecs = (value: boolean) => {
        setOpenSpecs(value)
    }
    const handleOpenPrint = (value: boolean) => {
        setOpenPrint(value)
    }

    const updateType = (type: DocumentType) => {
        setDocumentType(type)
    }

    const descargarPDF = async () => {
        const culpable = [...document.querySelectorAll("*")].find(el =>
            getComputedStyle(el).color.includes("lab")
        );

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
        <div className="mx-auto w-full max-w-[800px] h-full flex flex-col gap-4 bg-card-bg p-4 border border-gray-400/60 rounded shadow-lg/5">

            {/* HEADER */}
            <header className="flex items-center justify-between rounded-md bg-card-bg p-4 border border-gray-400/60">
                <div>
                    <h1 className="text-xl font-title font-semibold text-slate-800">
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
                    <SecondaryButton onClick={() => setOpenPrint(true)} >
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
                    <h3 className="mb-2 font-title text-sm font-semibold text-slate-700">
                        Cliente
                    </h3>
                    <p className="text-sm text-slate-800">{garantia.contacto.nombre}</p>
                    <p className="text-sm text-slate-500">{garantia.contacto.telefono}</p>
                    <p className="text-sm text-slate-500">{garantia.contacto.correo}</p>
                </div>

                {/* Producto */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 font-title text-sm font-semibold text-slate-700">
                        Producto
                    </h3>
                    <p className="text-sm text-slate-800">
                        {garantia.producto.caracteristicas.descripcion}
                    </p>
                    <p className="text-sm text-slate-500">
                        {garantia.producto.caracteristicas.serie}
                    </p>
                    {
                        producto.tipo === TipoProducto.PC && (
                            <button className="cursor-pointer mt-0.5 flex items-center gap-0.5 text-sm font-medium bg-orange-500/20 border border-orange-500/40 text-orange-900 hover:brightness-125 transition-all duration-200 ease-out py-0.5 px-2 rounded-full" onClick={() => setOpenSpecs(true)}>Ver ficha <ArrowRight size={18} /></button>
                        )
                    }
                </div>

                {/* Falla */}
                <div className="rounded-md bg-card-bg p-4 border border-gray-400/60">
                    <h3 className="mb-2 font-title text-sm font-semibold text-slate-700">
                        Resumen
                    </h3>
                    <p className="text-sm text-slate-800 line-clamp-3">
                        {garantia.resumen}
                    </p>
                </div>
            </div>

            {/* TABS */}
            <div className="rounded-md bg-card-bg border border-gray-400/60 min-h-64">
                <div className="flex border-b border-gray-400/60">
                    <button onClick={() => setTabOption(0)} className={`px-4 py-2 border-b-2 text-sm ${tabOption === 0 ? "border-accent text-accent font-medium" : "border-transparent hover:bg-slate-50 cursor-pointer"}`}>
                        Detalles
                    </button>
                    <button onClick={() => setTabOption(1)} className={`px-4 py-2 border-b-2 text-sm ${tabOption === 1 ? "border-accent text-accent font-medium" : "border-transparent hover:bg-slate-50 cursor-pointer"}`}>
                        Reporte técnico
                    </button>
                    <button onClick={() => setTabOption(2)} className={`px-4 py-2 border-b-2 text-sm ${tabOption === 2 ? "border-accent text-accent font-medium" : "border-transparent hover:bg-slate-50 cursor-pointer"}`}>
                        Historial
                    </button>
                </div>

                {
                    tabOption === 0 && (
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
                    )
                }
                {
                    tabOption === 1 && (
                        <div className="p-4 space-y-4">
                            {/* Detalle */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Reportes</p>
                                    {
                                        garantia.reporteTecnico?.map((reporte, i) => (
                                            <p key={i} className="text-sm text-slate-800">
                                                {reporte}
                                            </p>
                                        ))
                                    }

                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Añadir un reporte</p>
                                    {/* <p className="text-sm text-slate-800">{garantia.factura}</p> */}
                                </div>

                            </div>
                        </div>
                    )
                }
                {
                    tabOption === 2 && (
                        <div className="p-4 space-y-4">
                            <div className="flex flex-col gap-4">
                                {[...garantia.historial]
                                    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                                    .map((mov, i) => {
                                        const fecha = new Date(mov.fecha);

                                        return (
                                            <div key={i}>
                                                <p className={`text-sm ${ESTADO_GARANTIA_OPTION_STYLE[mov.estado]}`}>
                                                    {humanizeEstadoGarantia(mov.estado)}
                                                </p>

                                                <p className="text-sm text-slate-800">
                                                    El {fecha.toLocaleDateString("es-CR", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    })}{" a las "}
                                                    {fecha.toLocaleTimeString("es-CR", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {mov.usuario.nombre}
                                                </p>
                                            </div>
                                        );
                                    })}

                            </div>
                        </div>
                    )
                }
            </div>
            <a href={`/garantia/${garantia.token}`}>Página de cliente</a>
            {
                producto.tipo === TipoProducto.PC && (
                    <InfoDialog disclaimer="Ingresado al registrar la garantía." open={openSpecs} handleOpen={handleOpenSpecs} className="flex flex-col gap-4 border border-gray-400/60 rounded-md p-4" >
                        <p className="text-title-color">Ficha técnica del producto</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-500">Procesador</p>
                                <p className="text-sm text-slate-800">
                                    {producto.caracteristicas?.hardware?.cpu}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Tarjeta de video</p>
                                <p className="text-sm text-slate-800">
                                    {producto.caracteristicas?.hardware?.gpu}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Memoria RAM</p>
                                <p className="text-sm text-slate-800">
                                    {producto.caracteristicas?.hardware?.ram?.modulos} módulos
                                </p>
                                <p className="text-sm text-slate-800">
                                    {producto.caracteristicas?.hardware?.ram?.total} en total
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-slate-500">Almacenamiento</p>
                                <div className="grid grid-cols-2 gap-4">

                                    {
                                        producto.caracteristicas?.hardware?.almacenamiento?.map((el, i) => (
                                            <div key={i}>
                                                <p className="text-sm text-slate-800">
                                                    Tipo {el.tipo}
                                                </p>
                                                <p className="text-sm text-slate-800">
                                                    Capacidad {el.capacidad}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </InfoDialog>
                )
            }
            <PrintDialog updateType={updateType} onPrint={descargarPDF} open={openPrint} loading={loading} handleOpen={handleOpenPrint} className="inline-block pdf-preview border border-gray-400/60 rounded-md" >
                <WarrantyReceipt documentType={documentType} id="pdf" warranty={garantia} />
            </PrintDialog>
        </div>
    );
}

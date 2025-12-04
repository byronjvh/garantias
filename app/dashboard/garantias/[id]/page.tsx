"use client"

import { warrantyList } from "@/app/data/WarrantyList"
import Warranty from "./components/Warranty"
import "./page.module.css"
import PrimaryButton from "@/app/components/PrimaryButton"
import html2pdf from "html2pdf.js"
import { use } from "react"

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Record<string, string | string[] | undefined>;
};


export default function WarrantyPage({ params }: Props) {
    const { id } = use(params)
    const warranty = warrantyList.find(el => el.id === Number(id))

    const descargarPDF = async () => {
        const sheet = document.getElementById("pdf")
        if (!sheet) return

        let opt = {
            filename: `Garantía_${warranty?.nombre}.pdf`,
            image: { type: "webp" as const, quality: 1 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const }
        };
        html2pdf().set(opt).from(sheet).save()
    }

    if (!warranty) return <>No hay Garantía</>

    return (
        <div className="mx-auto rounded-t h-[calc(100vh-56px)] flex flex-col min-h-0 border border-gray-300">
            <div className="flex items-center justify-between bg-card-bg p-2 border-b border-gray-300">
                <p className="font-title text-lg font-bold text-title-color">Garantía #{id}</p>
                <PrimaryButton onClick={descargarPDF} text="Descargar" />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <Warranty id={id} warranty={warranty} />
            </div>
        </div>
    );
}

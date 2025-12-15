"use client"

import { warrantyList } from "@/app/data/WarrantyList"
import Warranty from "./components/Warranty"
import "./page.module.css"
import PrimaryButton from "@/app/components/PrimaryButton"
import { use, useState } from "react"

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Record<string, string | string[] | undefined>;
};


export default function WarrantyPage({ params }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const { id } = use(params)
    const warranty = warrantyList.find(el => el.id === Number(id))

    const descargarPDF = async () => {
        setLoading(true)
        const sheet = document.getElementById("pdf")
        if (!sheet) return

        const html2pdf = (await import("html2pdf.js")).default;

        const opt = {
            filename: `Garantía_${warranty?.nombre}.pdf`,
            image: { type: "webp" as const, quality: 1 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const }
        };
        html2pdf()
            .set(opt)
            .from(sheet)
            .outputPdf("bloburl")
            .then(pdfUrl => window.open(pdfUrl))
            .finally(() => setLoading(false))
    }

    if (!warranty) return <>No hay Garantía</>

    return (
        <div className="mx-auto rounded-t h-[calc(100vh-56px)] flex flex-col min-h-0 border border-gray-300">
            <div className="flex items-center justify-between bg-card-bg p-2 border-b border-gray-300">
                <p className="font-title text-lg font-bold text-title-color">Garantía #{id}</p>
                <PrimaryButton onClick={descargarPDF} loading={loading}>
                    Imprimir
                </PrimaryButton>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <Warranty id={id} warranty={warranty} />
            </div>
        </div>
    );
}

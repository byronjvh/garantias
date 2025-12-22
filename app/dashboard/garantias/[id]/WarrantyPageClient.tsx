// app/dashboard/garantias/[id]/WarrantyPageClient.tsx
"use client";

import Warranty from "./components/Warranty"
import PrimaryButton from "@/app/components/PrimaryButton"
import { useState } from "react"
import { GarantiaDetails } from "@/types/garantiaDetails"
import { Printer } from "lucide-react";

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

    return (
        <div className="mx-auto rounded-t h-[calc(100vh-56px)] flex flex-col min-h-0 w-full max-w-[800px] border border-gray-300">
            <div className="flex items-center justify-between bg-card-bg p-2 border-b border-gray-300">
                <p className="font-title text-lg font-bold text-title-color">
                    Caso {garantia.consecutivo}
                </p>
                <PrimaryButton onClick={descargarPDF} loading={loading}>
                    <Printer size={20} /> Imprimir
                </PrimaryButton>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
                <Warranty warranty={garantia} />
            </div>
        </div>
    );
}

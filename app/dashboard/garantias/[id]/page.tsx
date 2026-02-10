import WarrantyPageClient from "./WarrantyPageClient";
import { getGarantiaById } from "@/lib/actions/getGarantiaById";
import { notFound } from "next/navigation";
import crypto from "crypto";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function WarrantyPage({ params }: Props) {

    // 🟡 EN NEXT 16:
    const { id } = await params;

    const garantiaId = Number(id);

    if (Number.isNaN(garantiaId)) {
        return notFound(); // ID inválido
    }

    const garantia = await getGarantiaById(garantiaId);

    if (!garantia) {
        return notFound(); // no existe o no tiene permiso
    }

    return <WarrantyPageClient garantia={garantia} />;
}

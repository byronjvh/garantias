// lib/actions/getGarantiaById.ts
"use server";

import { prisma } from "@/lib/prisma";
import { parseContactoGarantia } from "@/lib/normalizers/parseContactoGarantia";
import { parseProductoGarantia } from "@/lib/normalizers/parseProductoGarantia";

export async function getGarantiaById(id: number) {
    const g = await prisma.garantia.findUnique({
        where: { id },
        select: {
            id: true,
            consecutivo: true,
            resumen: true,
            descripcion: true,
            estadoActual: true,
            fechaIngreso: true,
            contacto: true,
            producto: true,
            factura: true,
            sucursalActual: {
                select: {
                    id: true,
                    nombre: true,
                    prefijo: true,
                },
            },
        },
    });

    if (!g) return null;

    return {
        ...g,
        contacto: parseContactoGarantia(g.contacto),
        producto: parseProductoGarantia(g.producto),
    };
}

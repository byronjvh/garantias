import { prisma } from "@/lib/prisma";
import { parseContactoGarantia } from "@/lib/normalizers/parseContactoGarantia";
import type { EstadoGarantia } from "@/types";

const PAGE_SIZE = 10;

export async function getGarantiasList(page: number = 1) {
    const skip = (page - 1) * PAGE_SIZE;

    const [itemsRaw, total] = await Promise.all([
        prisma.garantia.findMany({
            skip,
            take: PAGE_SIZE,
            select: {
                id: true,
                consecutivo: true,
                resumen: true,
                estadoActual: true,
                fechaIngreso: true,
                contacto: true,
                sucursal: {
                    select: {
                        nombre: true,
                    },
                },
            },
            orderBy: {
                fechaIngreso: "desc",
            },
        }),
        prisma.garantia.count(),
    ]);

    const items = itemsRaw.map((g) => ({
        id: g.id,
        consecutivo: g.consecutivo,
        resumen: g.resumen,
        estadoActual: g.estadoActual as EstadoGarantia,
        fechaIngreso: g.fechaIngreso,
        contacto: parseContactoGarantia(g.contacto),
        sucursal: {
            nombre: g.sucursal.nombre,
        },
    }));

    return {
        items,
        pagination: {
            page,
            pageSize: PAGE_SIZE,
            total,
            totalPages: Math.ceil(total / PAGE_SIZE),
            hasNext: skip + PAGE_SIZE < total,
            hasPrev: page > 1,
        },
    };
}

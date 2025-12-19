import { prisma } from "@/lib/prisma";
import { parseContactoGarantia } from "@/lib/normalizers/parseContactoGarantia";
import { parseProductoGarantia } from "../normalizers/parseProductoGarantia";
import type { EstadoGarantia } from "@/types";

type GetGarantiasParams = {
    page?: number;
    sucursalActualId?: number; // solo para roles NO nivel 2
    canViewAll: boolean;
};

const PAGE_SIZE = 10;

export async function getGarantiasList({
    page = 1,
    sucursalActualId,
    canViewAll,
}: GetGarantiasParams) {
    const skip = (page - 1) * PAGE_SIZE;

    // 🔐 control de visibilidad
    const where = canViewAll
        ? {}
        : {
            sucursalActualId,
        };

    const [itemsRaw, total] = await Promise.all([
        prisma.garantia.findMany({
            skip,
            take: PAGE_SIZE,
            where,
            orderBy: { fechaIngreso: "desc" },
            select: {
                id: true,
                consecutivo: true,
                resumen: true,
                estadoActual: true,
                fechaIngreso: true,
                contacto: true,
                producto: true,
                sucursalActual: {
                    select: {
                        id: true,
                        nombre: true,
                        prefijo: true,
                    },
                },
            },
        }),
        prisma.garantia.count({ where }),
    ]);

    const items = itemsRaw.map((g) => ({
        id: g.id,
        consecutivo: g.consecutivo ?? undefined,
        resumen: g.resumen,
        estadoActual: g.estadoActual as EstadoGarantia,
        fechaIngreso: g.fechaIngreso,
        contacto: parseContactoGarantia(g.contacto),
        producto: parseProductoGarantia(g.producto),
        sucursal: {
            id: g.sucursalActual.id,
            nombre: g.sucursalActual.nombre,
            prefijo: g.sucursalActual.prefijo,
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

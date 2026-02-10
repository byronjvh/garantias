
import { parseContactoGarantia } from "@/lib/normalizers/parseContactoGarantia";
import { parseProductoGarantia } from "@/lib/normalizers/parseProductoGarantia";
import type { EstadoGarantia } from "@/types/types";
import { prisma } from "../prisma";

type GetGarantiasParams = {
    page?: number;
    search?: string;
    estado?: EstadoGarantia | null;
    sucursal?: string | null;
    sucursalActualId?: number;
    canViewAll: boolean;
};


const PAGE_SIZE = 20;

export async function getGarantiasList({
    page = 1,
    sucursalActualId,
    canViewAll,
    search,
    estado,
    sucursal
}: GetGarantiasParams) {

    const where: any = {};

    if (!canViewAll && sucursalActualId) {
        where.sucursalActualId = sucursalActualId;
    }


    if (search) {
        where.OR = [
            { consecutivo: { contains: search, mode: "insensitive" } },
            { resumen: { contains: search, mode: "insensitive" } },
            { contacto: { path: ["nombre"], string_contains: search } },
            { contacto: { path: ["correo"], string_contains: search } },
            { contacto: { path: ["telefono"], string_contains: search } },
            { producto: { path: ["caracteristicas", "descripcion"], string_contains: search } },
            { sucursalActual: { nombre: { contains: search, mode: "insensitive" } } },
            { sucursalIngreso: { nombre: { contains: search, mode: "insensitive" } } },
        ];
    }

    if (estado) {
        where.estadoActual = estado;
    }

    if (sucursal) {
        where.sucursalIngreso = {
            nombre: sucursal,
        };
    }

    const skip = (page - 1) * PAGE_SIZE;

    const [itemsRaw, total] = await prisma.$transaction([
        prisma.garantia.findMany({
            where,
            skip,
            take: PAGE_SIZE,
            orderBy: { fechaIngreso: "desc" },
            select: {
                id: true,
                consecutivo: true,
                resumen: true,
                estadoActual: true,
                fechaIngreso: true,
                contacto: true,
                producto: true,
                resolucion: true,
                sucursalActual: {
                    select: { id: true, nombre: true, prefijo: true },
                },
                sucursalIngreso: {
                    select: { id: true, nombre: true, prefijo: true },
                },
            },
        }),
        prisma.garantia.count({ where }),
    ]);

    const items = itemsRaw.map((g) => {

        return {
            id: g.id,
            consecutivo: g.consecutivo ?? undefined,
            resumen: g.resumen,
            estadoActual: g.estadoActual as EstadoGarantia,
            fechaIngreso: g.fechaIngreso,
            contacto: parseContactoGarantia(g.contacto),
            producto: parseProductoGarantia(g.producto),
            resolucion: g.resolucion,
            sucursalActual: {
                id: g.sucursalActual.id,
                nombre: g.sucursalActual.nombre,
                prefijo: g.sucursalActual.prefijo,
            },
            sucursalIngreso: {
                id: g.sucursalIngreso.id,
                nombre: g.sucursalIngreso.nombre,
                prefijo: g.sucursalIngreso.prefijo,
            },
        };
    });

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

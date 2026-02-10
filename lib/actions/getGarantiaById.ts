// lib/actions/getGarantiaById.ts
"use server";

import { prisma } from "@/lib/prisma";
import { parseContactoGarantia } from "@/lib/normalizers/parseContactoGarantia";
import { parseProductoGarantia } from "@/lib/normalizers/parseProductoGarantia";
import { parseReporteTecnico } from "../normalizers/parseReporteTecnico";

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
            reporteTecnico: true,
            factura: true,
            token: true,
            sucursalActual: {
                select: {
                    id: true,
                    nombre: true,
                    prefijo: true,
                },
            },
            sucursalIngreso: {
                select: {
                    id: true,
                    nombre: true,
                    prefijo: true,
                },
            },
            historial: {
                include: {
                    sucursal: true
                }
            },
        },
    });

    if (!g) return null;

    return {
        ...g,
        contacto: parseContactoGarantia(g.contacto),
        producto: parseProductoGarantia(g.producto),
        reporteTecnico: parseReporteTecnico(g.reporteTecnico),
        historial: g.historial.map(h => ({
            id: h.id,
            estado: h.estado,
            fecha: h.fecha.toISOString(),
            usuario: {
                id: h.usuarioId,
                nombre: h.usuarioNombre,
                rol: h.usuarioRol,
            },
            sucursal: {
                id: h.sucursal.id,
                nombre: h.sucursal.nombre,
                prefijo: h.sucursal.prefijo,
            },
        })),
    };
}

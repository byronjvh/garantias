import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


import { parseProductoGarantiaPublico } from "@/lib/normalizers/parseProductoGarantiaPublico";
import { ensureEstadoGarantia, isProductoGarantia } from "@/app/utils/guards";

export async function GET(
    _: Request,
    { params }: { params: { token: string } }
) {
    const garantia = await prisma.garantia.findUnique({
        where: { token: params.token },
        select: {
            consecutivo: true,
            estadoActual: true,
            fechaIngreso: true,
            producto: true,
            historial: {
                orderBy: { fecha: "asc" },
                select: {
                    estado: true,
                    fecha: true,
                    sucursal: {
                        select: {
                            nombre: true,
                            prefijo: true,
                        },
                    },
                },
            },
        },
    });

    if (!garantia) {
        return NextResponse.json(
            { error: "Garantía no encontrada" },
            { status: 404 }
        );
    }

    // 🟢 Producto público seguro
    const productoPublico = isProductoGarantia(garantia.producto)
        ? parseProductoGarantiaPublico(garantia.producto)
        : null;

    return NextResponse.json({
        consecutivo: garantia.consecutivo,
        estadoActual: ensureEstadoGarantia(garantia.estadoActual),
        fechaIngreso: garantia.fechaIngreso,
        producto: productoPublico,
        timeline: garantia.historial.map((h, i, arr) => ({
            estado: ensureEstadoGarantia(h.estado),
            fecha: h.fecha.toISOString(),
            sucursal: `${h.sucursal.prefijo} - ${h.sucursal.nombre}`,
            actual: i === arr.length - 1,
        })),
    });
}

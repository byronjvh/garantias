import { isProductoGarantia } from "@/app/utils/guards";
import { prisma } from "@/lib/prisma";

export async function getPublicGarantia(token: string) {
    const g = await prisma.garantia.findUnique({
        where: { token },
        select: {
            consecutivo: true,
            estadoActual: true,
            fechaIngreso: true,
            producto: true,
            historial: {
                select: {
                    fecha: true,
                    estado: true,
                    sucursal: {
                        select: {
                            nombre: true,
                            prefijo: true,
                        },
                    },
                },
                orderBy: { fecha: "asc" },
            },
        },
    });

    if (!g) return null;

    if (!isProductoGarantia(g.producto)) {
        throw new Error("Producto inválido");
    }

    return {
        consecutivo: g.consecutivo,
        estadoActual: g.estadoActual,
        fechaIngreso: g.fechaIngreso.toISOString(),
        producto: g.producto,
        historial: g.historial.map(h => ({
            fecha: h.fecha.toISOString(),
            estado: h.estado,
            sucursal: `${h.sucursal.prefijo} - ${h.sucursal.nombre}`,
        })),
    };
}

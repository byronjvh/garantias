import { isProductoGarantia } from "@/app/utils/guards";
import { prisma } from "@/lib/prisma";
import { parseContactoGarantia } from "../normalizers/parseContactoGarantia";
import { parseProductoGarantia } from "../normalizers/parseProductoGarantia";

export async function getPublicGarantia(token: string) {
    const g = await prisma.garantia.findUnique({
        where: { token },
        select: {
            consecutivo: true,
            estadoActual: true,
            fechaIngreso: true,
            sucursalIngreso: true,
            producto: true,
            contacto: true,
            descripcion: true,
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
        fechaIngreso: g.fechaIngreso,
        producto: parseProductoGarantia(g.producto),
        sucursalIngreso: g.sucursalIngreso,
        contacto: parseContactoGarantia(g.contacto),
        descripcion: g.descripcion,
        historial: g.historial.map(h => ({
            fecha: h.fecha,
            estado: h.estado,
            sucursal: h.sucursal.nombre,
        })),
    };
}

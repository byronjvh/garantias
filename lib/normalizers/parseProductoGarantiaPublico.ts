// lib/normalizers/parseProductoGarantiaPublico.ts

import { ProductoGarantia } from "@/types/types";

export function parseProductoGarantiaPublico(
    producto: ProductoGarantia
) {
    if (producto.tipo === "PC") {
        return {
            tipo: "PC",
            titulo: producto.caracteristicas.descripcion,
            serie: producto.caracteristicas.serie,
        };
    }

    return {
        tipo: "OTRO",
        titulo: producto.caracteristicas.descripcion,
        serie: producto.caracteristicas.serie,
    };
}

// lib/normalizers/parseProductoGarantia.ts
import { ProductoGarantia } from "@/types";
import { JsonValue } from "@prisma/client/runtime/client";

export function parseProductoGarantia(value: JsonValue): ProductoGarantia {
    if (typeof value === "object" && value !== null) {
        const producto = value as Record<string, unknown>;

        if (
            typeof producto.tipo === "string" &&
            typeof producto.descripcion === "string"
        ) {
            return producto as unknown as ProductoGarantia;
        }
    }

    throw new Error("Producto de garantía inválido");
}

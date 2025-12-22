// lib/normalizers/parseProductoGarantia.ts
import { ProductoGarantia } from "@/types/types";
import { JsonValue } from "@prisma/client/runtime/client";

function isProductoGarantia(value: unknown): value is ProductoGarantia {
    if (!value || typeof value !== "object") return false;

    const v = value as Record<string, unknown>;

    return (
        typeof v.tipo === "string" &&
        typeof v.descripcion === "string"
    );
}

export function parseProductoGarantia(value: JsonValue): ProductoGarantia {
    if (isProductoGarantia(value)) {
        return value;
    }

    throw new Error("Producto de garantía inválido");
}

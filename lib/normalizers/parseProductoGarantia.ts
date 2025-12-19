// lib/normalizers/parseProductoGarantia.ts
import { ProductoGarantia } from "@/types";
import { JsonValue } from "@prisma/client/runtime/client";

export function parseProductoGarantia(value: JsonValue): ProductoGarantia {
    if (typeof value === "object" && value !== null && "tipo" in value && "descripcion" in value) {
        return value as unknown as ProductoGarantia;
    }


    throw new Error("Producto de garantía inválido");
}

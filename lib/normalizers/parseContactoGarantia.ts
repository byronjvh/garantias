// lib/normalizers/parseContactoGarantia.ts
import { ContactoGarantia } from "@/types";
import { JsonValue } from "@prisma/client/runtime/client";

export function parseContactoGarantia(value: JsonValue): ContactoGarantia {
    if (
        typeof value === "object" &&
        value !== null &&
        "nombre" in value &&
        "correo" in value &&
        "telefono" in value
    ) {
        return value as ContactoGarantia;
    }

    throw new Error("Contacto de garantía inválido");
}

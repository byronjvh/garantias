// lib/normalizers/parseContactoGarantia.ts
import { ContactoGarantia } from "@/types/types";
import { JsonValue } from "@prisma/client/runtime/client";

export function parseContactoGarantia(value: JsonValue): ContactoGarantia {
    if (!value || typeof value !== "object") {
        throw new Error("Contacto de garantía inválido (null o no objeto)");
    }

    const contacto = value as Record<string, unknown>;

    if (
        typeof contacto.nombre === "string" &&
        typeof contacto.correo === "string" &&
        typeof contacto.telefono === "string"
    ) {
        return contacto as ContactoGarantia;
    }

    throw new Error("Contacto de garantía con estructura inválida");
}

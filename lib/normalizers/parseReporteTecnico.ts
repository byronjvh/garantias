// lib/normalizers/parseReporteTecnico.ts
import { JsonValue } from "../generated/prisma/internal/prismaNamespace";

export function parseReporteTecnico(value: JsonValue): string[] {
    if (!value) {
        throw new Error("Reporte técnico inválido (null)");
    }

    if (!Array.isArray(value)) {
        throw new Error("Reporte técnico inválido (no es un array)");
    }

    const reporte = value as unknown[];

    if (reporte.every(item => typeof item === "string")) {
        return reporte;
    }

    throw new Error("Reporte técnico inválido (el array contiene valores no string)");
}

import { EstadoGarantia } from "@/types";

export function humanizeEstadoGarantia(estado: EstadoGarantia): string {
    return estado
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, l => l.toUpperCase());
}

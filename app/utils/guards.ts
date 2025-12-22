import { EstadoGarantia, ESTADOS_GARANTIA } from "@/types/types";

export function isEstadoGarantia(v: unknown): v is EstadoGarantia {
    return typeof v === "string" &&
        (ESTADOS_GARANTIA as readonly string[]).includes(v);
}

export function ensureEstadoGarantia(
    v: unknown,
    fallback: EstadoGarantia = "INGRESADA"
): EstadoGarantia {
    return isEstadoGarantia(v) ? v : fallback;
}

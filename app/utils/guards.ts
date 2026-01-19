import { EstadoGarantia, ESTADOS_GARANTIA, ProductoGarantiaBase, ProductoGarantiaEscritorio, ProductoGarantiaLaptop } from "@/types/types";

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

export function isProductoGarantiaBase(
    value: unknown
): value is ProductoGarantiaBase {
    if (!value || typeof value !== "object") return false;

    const v = value as Record<string, unknown>;

    if (
        typeof v.descripcion !== "string" ||
        typeof v.estadoFisico !== "string"
    ) {
        return false;
    }

    if (v.accesorios !== undefined && typeof v.accesorios !== "string") {
        return false;
    }

    return true;
}

export function isProductoPC(
    value: unknown
): value is ProductoGarantiaEscritorio | ProductoGarantiaLaptop {
    if (!isProductoGarantiaBase(value)) return false;

    const v = value as unknown as Record<string, unknown>;

    if (v.hardware !== undefined) {
        if (typeof v.hardware !== "object" || v.hardware === null) return false;

        const h = v.hardware as Record<string, unknown>;

        if (h.cpu !== undefined && typeof h.cpu !== "string") return false;
        if (h.gpu !== undefined && typeof h.gpu !== "string") return false;

        if (h.ram !== undefined) {
            if (
                typeof h.ram !== "object" ||
                h.ram === null ||
                typeof (h.ram as any).modulos !== "number" ||
                typeof (h.ram as any).total !== "string"
            ) {
                return false;
            }
        }
    }

    return true;
}


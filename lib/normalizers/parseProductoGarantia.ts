import { isProductoGarantiaBase, isProductoPC } from "@/app/utils/guards";
import { ProductoGarantia, TipoProducto } from "@/types/types";
import { JsonValue } from "../generated/prisma/internal/prismaNamespace";

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}
export function parseProductoGarantia(value: JsonValue): ProductoGarantia {
    if (!isObject(value)) {
        throw new Error("Producto inválido");
    }

    const { tipo, caracteristicas } = value;

    if (typeof tipo !== "string" || !isObject(caracteristicas)) {
        throw new Error("Producto inválido");
    }

    // 🖥️ PC → base + extras (TODO)
    if (tipo === TipoProducto.PC) {
        if (!isProductoPC(caracteristicas)) {
            throw new Error("PC con características inválidas");
        }

        return {
            tipo: TipoProducto.PC,
            caracteristicas: caracteristicas as any, // ← se devuelve COMPLETO
        };
    }

    // 📦 Otros productos → base
    if (!isProductoGarantiaBase(caracteristicas)) {
        throw new Error("Producto base inválido");
    }

    return {
        tipo: tipo as Exclude<TipoProducto, TipoProducto.PC>,
        caracteristicas: caracteristicas,
    };
}

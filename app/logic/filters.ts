import { GarantiaItem } from "../dashboard/garantias/page"

export const searchFilter = (array: GarantiaItem[], query: string) => {
    if (!query) return array
    let normalizedQuery = normalizeText(query)

    return array.filter(item =>
        normalizeText(item.consecutivo as string)?.includes(normalizedQuery) ||
        normalizeText(item.contacto.nombre).includes(normalizedQuery) ||
        normalizeText(item.contacto.correo).includes(normalizedQuery) ||
        normalizeText(item.contacto.telefono).includes(normalizedQuery) ||
        normalizeText(item.producto.caracteristicas.descripcion).includes(normalizedQuery) ||
        normalizeText(item.producto.caracteristicas.serie as string).includes(normalizedQuery) ||
        normalizeText(item.producto.tipo).includes(normalizedQuery) ||
        normalizeText(item.resumen).includes(normalizedQuery) ||
        normalizeText(item.sucursalActual.nombre).includes(normalizedQuery) ||
        normalizeText(item.sucursalIngreso.nombre).includes(normalizedQuery)
    )
}

export const statusFilter = (array: GarantiaItem[], status: string | null) => {
    if (!status) return array
    return array.filter(item => item.estadoActual === status)
}
export const sucursalFilter = (array: GarantiaItem[], sucursal: string | null) => {
    if (!sucursal) return array
    return array.filter(item => item.sucursalIngreso.nombre === sucursal)
}

function normalizeText(text: string) {
    return text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
import { EstadoGarantia, Rol } from "@/types/types";

export const transicionesPorRol: Record<Rol, EstadoGarantia[]> = {
    ADMIN: [
        "INGRESADA",
        "EN_REVISION_SUCURSAL",
        "ESCALADA_A_CEDI",
        "LISTA_PARA_RETIRO",
        "RECHAZADA"
    ],

    ASESOR: ["INGRESADA"],

    TECNICO: [
        "INGRESADA",
        "EN_REVISION_SUCURSAL",
        "ESCALADA_A_CEDI",
        "LISTA_PARA_RETIRO",
        "RECHAZADA"
    ],

    TECNICO_2: [
        "INGRESADA",
        "EN_REVISION_CEDI",
        "ENVIADA_A_PROVEEDOR",
        "ESPERANDO_REPUESTO",
        "EN_REPARACION",
        "DEVUELTA_A_SUCURSAL",
        "LISTA_PARA_RETIRO",
        "RECHAZADA"
    ],

    TI: [
        "INGRESADA",
        "EN_REVISION_SUCURSAL",
        "ESCALADA_A_CEDI",
        "EN_REVISION_CEDI",
        "ENVIADA_A_PROVEEDOR",
        "ESPERANDO_REPUESTO",
        "EN_REPARACION",
        "DEVUELTA_A_SUCURSAL",
        "LISTA_PARA_RETIRO",
        "RECHAZADA"
    ]
};

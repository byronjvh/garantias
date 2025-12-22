export type Sucursal = {
    id: number;
    nombre: string;
};

export type PageProps = {
    params: {
        id: string;
    };
    searchParams: Record<string, string | string[] | undefined>;
};

export type Rol =
    | "ADMIN"
    | "ASESOR"
    | "TECNICO"
    | "TECNICO_2"
    | "TI";

export type EstadoGarantia =
    | "INGRESADA"
    | "EN_REVISION_SUCURSAL"
    | "ESCALADA_A_CEDI"
    | "EN_REVISION_CEDI"
    | "ENVIADA_A_PROVEEDOR"
    | "ESPERANDO_REPUESTO"
    | "EN_REPARACION"
    | "DEVUELTA_A_SUCURSAL"
    | "LISTA_PARA_RETIRO"
    | "RECHAZADA"
    | "RESUELTA";

export const ESTADOS_GARANTIA = [
    "INGRESADA",
    "EN_REVISION_SUCURSAL",
    "ESCALADA_A_CEDI",
    "EN_REVISION_CEDI",
    "ENVIADA_A_PROVEEDOR",
    "ESPERANDO_REPUESTO",
    "EN_REPARACION",
    "DEVUELTA_A_SUCURSAL",
    "LISTA_PARA_RETIRO",
    "RECHAZADA",
    "RESUELTA"
] as const;


export interface UsuarioMini {
    id: number;
    nombre: string;
    rol: Rol;
}

export interface HistorialGarantia {
    estado: EstadoGarantia;
    usuario: UsuarioMini;
    fecha: string; // ISO string
    comentario?: string;
}


export interface ProductoGarantia {
    tipo: "LAPTOP" | "ESCRITORIO" | "OTRO";
    descripcion: string;
    serie?: string;

    encendido?: {
        enciende: boolean;
        puedeFormatear?: boolean;
        contrasena?: string;
    };

    hardware?: {
        cpu?: string;
        gpu?: string;
        ram?: {
            modulos: number;
            total: string;
        };
        almacenamiento?: {
            tipo: string;
            capacidad: string;
        }[];
    };

    accesorios?: {
        cargadorIncluido?: boolean;
        otros?: string[];
    };
}


export interface Garantia {
    id: number;
    consecutivo: string;
    resumen: string;
    descripcion?: string;
    estadoActual: EstadoGarantia;
    factura: string;
    contacto: {
        nombre: string;
        correo: string;
        telefono: string;
    };

    producto: ProductoGarantia;

    sucursal: {
        id: number;
        nombre: string;
        prefijo: string;
    };

    usuarios: {
        cuentaDuena: UsuarioMini;
        ingresadoPor: UsuarioMini;
    };

    fechas: {
        ingreso: string;
    };

    historial: HistorialGarantia[];
}

export type ContactoGarantia = {
    nombre: string;
    correo: string;
    telefono: string;
};
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

export type EstadoPublicoGarantia =
    | "RECIBIDA"
    | "EN_REVISION"
    | "EN_PROCESO"
    | "LISTA_PARA_RETIRO";

export const ESTADO_PUBLICO_MAP: Record<
    EstadoGarantia,
    EstadoPublicoGarantia
> = {
    INGRESADA: "RECIBIDA",

    EN_REVISION_SUCURSAL: "EN_REVISION",
    ESCALADA_A_CEDI: "EN_REVISION",
    EN_REVISION_CEDI: "EN_REVISION",

    ENVIADA_A_PROVEEDOR: "EN_PROCESO",
    ESPERANDO_REPUESTO: "EN_PROCESO",
    EN_REPARACION: "EN_PROCESO",
    DEVUELTA_A_SUCURSAL: "EN_PROCESO",

    LISTA_PARA_RETIRO: "LISTA_PARA_RETIRO",

    RESUELTA: "LISTA_PARA_RETIRO",
    RECHAZADA: "LISTA_PARA_RETIRO",
};

export const ESTADO_PUBLICO_LABEL: Record<
    EstadoPublicoGarantia,
    string
> = {
    RECIBIDA: "Producto recibido",
    EN_REVISION: "En revisión",
    EN_PROCESO: "En proceso",
    LISTA_PARA_RETIRO: "Lista para retirar",
};

export const ESTADO_PUBLICO_DESCRIPCION: Record<
    EstadoPublicoGarantia,
    string
> = {
    RECIBIDA:
        "Hemos recibido tu producto en la tienda.",

    EN_REVISION:
        "Estamos evaluando el producto para determinar la mejor solución.",

    EN_PROCESO:
        "El caso se encuentra en gestión y seguimiento por nuestro equipo.",

    LISTA_PARA_RETIRO:
        "Tu producto ya está disponible para ser retirado en la tienda.",
};


export enum TipoProducto {
    PC = "PC",
    OTRO = "OTRO",
}


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

export type ProductoGarantia =
    | {
        tipo: TipoProducto.PC;
        caracteristicas: ProductoGarantiaPC;
    }
    | {
        tipo: TipoProducto.OTRO;
        caracteristicas: ProductoGarantiaBase;
    };


export interface ProductoGarantiaBase {
    descripcion: string;
    estadoFisico: string;
    serie?: string;
    accesorios?: string;
}


export interface ProductoGarantiaPC extends ProductoGarantiaBase {
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
}

export type ProductoGarantiaPublico = {
    tipo: string;
    descripcion: string;
    serie?: string;
};


export interface Garantia {
    id: number;
    consecutivo: string;
    resumen: string;
    descripcion: string;
    resolucion?: string;
    estadoActual: EstadoGarantia;
    factura: string;
    token: string | null;
    contacto: {
        nombre: string;
        correo: string;
        telefono: string;
    };

    producto: ProductoGarantia;
    reporteTecnico: string[];

    sucursalActual: {
        id: number;
        nombre: string;
        prefijo: string;
    };
    sucursalIngreso: {
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
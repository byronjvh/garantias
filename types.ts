export type WarrantyStatus =
    | "pending"
    | "diagnosis"
    | "processing"
    | "denied"
    | "resolved";

export interface Producto {
    descripcion: string;
    sku: string;
    enciende: boolean;
    puede_formatear: boolean;
    contrasena: string;
    cpu: string;
    gpu: string;
    ram: {
        modulos: string;
        cantidad: string;
    };
    almacenamiento: {
        cantidad: string;
        tipo: string;
    }[];
    tapa_izquierda: { material: string };
    tapa_derecha: { material: string };
    psu: {
        descripcion: string;
        watts: string;
        cable: boolean;
    };
    cargador: {
        incluido: boolean;
        capacidad: string;
        notas: string;
    };
    serie: string;
    estado_fisico: string;
    problema: string;
    resolucion: string;
}

export interface Warranty {
    id: number,
    descripcion_corta: string;
    fecha: string;
    telefono: string;
    nombre: string;
    factura: string;
    correo: string;
    status: WarrantyStatus;
    resolucion: string;
    producto: Producto;
}

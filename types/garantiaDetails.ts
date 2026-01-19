import { ContactoGarantia, EstadoGarantia, ProductoGarantia, TipoProducto } from "./types";

export type GarantiaDetails = {
    id: number;
    consecutivo: string | null;
    resumen: string;
    descripcion: string;
    estadoActual: EstadoGarantia;
    fechaIngreso: Date;
    contacto: ContactoGarantia;
    producto: ProductoGarantia
    factura: string | null;
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

};

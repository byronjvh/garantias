import { ContactoGarantia, EstadoGarantia, HistorialGarantia, ProductoGarantia, TipoProducto } from "./types";

export type GarantiaDetails = {
    id: number;
    consecutivo: string | null;
    resumen: string;
    descripcion: string;
    resolucion?: string;
    estadoActual: EstadoGarantia;
    fechaIngreso: Date;
    contacto: ContactoGarantia;
    producto: ProductoGarantia;
    reporteTecnico?: string[];
    factura: string | null;
    token: string | null;
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
    historial: HistorialGarantia[]
};

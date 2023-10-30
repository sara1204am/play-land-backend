import { articulo } from "@prisma/client";
export declare class Articulo implements articulo {
    id: string;
    nombre: string;
    nombre_corto: string;
    descripcion: string;
    cantidad: number;
    costo_unitario: number;
    precio_minimo: number;
    precio_maximo: number;
    active: boolean;
    id_lote: string;
}

import { articulo, Prisma } from "@prisma/client";

export class Articulo implements articulo {
    id: string;
    nombre: string;
    nombre_corto: string;
    descripcion: string;
    cantidad: number;
    costo_unitario: number;
    precio: number;
    active: boolean;
    stock_by_option: Prisma.JsonValue;
    type: string;
    descuento: number;
    id_lote: string;
    created_at: Date;

}
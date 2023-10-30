import { venta } from "@prisma/client";
export declare class Venta implements venta {
    id: string;
    fecha: Date;
    precio: number;
    nota: string;
    id_articulo: string;
}

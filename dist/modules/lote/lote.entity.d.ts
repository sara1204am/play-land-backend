import { lote } from "@prisma/client";
export declare class Lote implements lote {
    id: string;
    fecha: Date;
    nombre: string;
    costo: number;
    total_pagado: string;
    adelantos: string;
    costo_transporte: string;
    medio_transporte: string;
    proveedor_nombre: string;
    proveedor_celular: string;
    proveedor_ciudad: string;
}

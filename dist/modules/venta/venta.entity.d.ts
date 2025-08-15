import { Prisma, venta } from "@prisma/client";
export declare class Venta implements venta {
    id: string;
    fecha: Date;
    total: number;
    nota: string;
    detail: Prisma.JsonValue;
}

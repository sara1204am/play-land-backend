import { Prisma, venta } from "@prisma/client";

export class Venta implements venta {
    id: string;
    fecha: Date;
    total: number;
    nota: string;
    detail: Prisma.JsonValue;
    detail_generico: Prisma.JsonValue;

}
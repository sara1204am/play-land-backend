import { stock_fisico } from "@prisma/client";

export class StockFisico implements stock_fisico {
    id: string;
    articuloId: string;
    variante: string;
    ubicacionId: string;
    cantidad: number;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    updatedById: string;
}

import { conteo_fisico_detalle } from "@prisma/client";

export class ConteoFisicoDetalle implements conteo_fisico_detalle {
    id: string;
    conteoId: string;
    articuloId: string;
    variante: string;
    ubicacionId: string;
    cantidadSistema: number;
    cantidadContada: number;
    diferencia: number;
    contadoById: string;
    createdAt: Date;
}

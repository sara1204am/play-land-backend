import { conteo_fisico } from "@prisma/client";

export class ConteoFisico implements conteo_fisico {
    id: string;
    nombre: string;
    fecha: Date;
    observacion: string;
    createdById: string;
    createdAt: Date;
}

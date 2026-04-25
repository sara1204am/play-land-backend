import { ubicacion } from "@prisma/client";

export class Ubicacion implements ubicacion {
    id: string;
    nombre: string;
    descripcion: string;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
}

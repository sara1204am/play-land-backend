import { imagen } from "@prisma/client";

export class Imagenes implements imagen {
    id: string;
    nombre: string;
    id_articulo: string;

}
import { imagenes } from "@prisma/client";

export class Imagenes implements imagenes {
    id: string;
    nombre: string;
    id_articulo: string;
    url: string;
    url_2: string;

}
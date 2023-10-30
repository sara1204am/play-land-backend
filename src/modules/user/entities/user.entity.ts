import { Prisma, user } from "@prisma/client";

export class User implements user {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    gender: number;
    country: string;
    city: string;
    address: string;
    phone: Prisma.JsonValue;
    birthDate: Date;
    username: string;
    password: string;
    email: string;

  
} 
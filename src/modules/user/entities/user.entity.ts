import { Prisma, user } from "@prisma/client";

export class User implements user {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    emailVerified: boolean;
    verificationToken: string;
    status: boolean;
} 
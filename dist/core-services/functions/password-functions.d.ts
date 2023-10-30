export default class PasswordFunctions {
    static hashPassword(password: string, rounds?: number): string;
    static checkPassword(hashedPassword: string, plainPassword: string): boolean;
}

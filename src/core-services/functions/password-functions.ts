/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcryptjs';
export default class PasswordFunctions {
  static hashPassword(password: string, rounds: number = null): string {
    const saltRounds = bcrypt.genSaltSync(
      parseInt(process.env.SALT_ROUNDS, 10),
    );
    if (rounds) {
      return bcrypt.hashSync(password, rounds);
    }
    return bcrypt.hashSync(password, saltRounds);
  }

  static checkPassword(hashedPassword: string, plainPassword: string): boolean {
    if (hashedPassword && plainPassword) {
      return bcrypt.compareSync(plainPassword, hashedPassword);
    }
    return false;
  }
}

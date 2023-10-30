/* eslint-disable prettier/prettier */
import { environmentDefault } from './basic.config';

export async function configuration() {
    const tmpEnv = {
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    }
    return {
        ...environmentDefault,
        ...tmpEnv,
  };
}

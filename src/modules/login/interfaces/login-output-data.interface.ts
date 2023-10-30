/* eslint-disable prettier/prettier */
export interface LoginOutputData {
  id: string;
  userId: string;
  ttl: string | number;
  createdAt: Date;
  user: any; /* TODO entity User */
  access: boolean;
}

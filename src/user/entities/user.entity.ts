import { Exclude } from 'class-transformer';

export class User {
  id: string;
  login: string;
  createdAt: number;
  updatedAt: number;
  version: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

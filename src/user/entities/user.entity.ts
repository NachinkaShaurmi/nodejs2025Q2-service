import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  login: string;

  @Column('varchar', { length: 255 })
  @Exclude()
  password: string;

  @Column('int', { default: 1 })
  @Transform(({ value }) => Number(value))
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  @Transform(({ value }) => Number(new Date(value).getTime()))
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Transform(({ value }) => Number(new Date(value).getTime()))
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
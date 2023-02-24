import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @Transform(({ value }) => value.getTime())
  @CreateDateColumn()
  createdAt: Date;

  @Transform(({ value }) => value.getTime())
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

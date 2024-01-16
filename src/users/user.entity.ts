import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Exclude()
@Entity('users')
export class UserEntity {
  @Expose()
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Expose()
  @Column()
  @ApiProperty()
  firstName: string;

  @Expose()
  @Column()
  @ApiProperty()
  lastName: string;

  @Expose()
  @Column()
  @ApiProperty()
  email: string;

  @Expose()
  @Column()
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @ApiProperty({
    example: 1,
  })
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @ApiProperty({
    example: 'Rafael Nakashima',
  })
  @Column({
    length: 63,
  })
  name: string;

  @ApiProperty({
    example: 'email@email.com',
  })
  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: '123456a!A',
  })
  @Column({
    length: 127,
  })
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty({
    enum: [Role.Admin, Role.User, Role.Company],
    example: Role.User,
  })
  @Column({
    default: Role.User,
  })
  role: number;

  @ApiProperty({
    example: '12345678901',
  })
  @Column({
    length: 11,
    nullable: true,
    unique: true,
  })
  cpf?: string;

  @ApiProperty({
    example: '12345678901234',
  })
  @Column({
    length: 14,
    nullable: true,
    unique: true,
  })
  cnpj?: string;
}

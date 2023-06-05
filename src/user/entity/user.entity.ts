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
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;
  @Column({
    length: 63,
  })
  name: string;
  @Column({
    length: 127,
    unique: true,
  })
  email: string;
  @Column({
    length: 127,
  })
  password: string;
  @CreateDateColumn()
  createdAt?: Date;
  @Column({
    default: Role.User,
  })
  role: number;
  @Column({
    length: 11,
    nullable: true,
    unique: true,
  })
  cpf?: string;
  @Column({
    length: 14,
    nullable: true,
    unique: true,
  })
  cnpj?: string;
}

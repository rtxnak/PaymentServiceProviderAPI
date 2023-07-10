import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';
import { Role } from '../../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NewUserDTO {
  @ApiProperty({
    example: 'Rafael Nakashima',
    description: `user name is just used for display.`,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'email@email.com',
    description: `email have to be UNIQUE and on email format like example, is used to login.`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456a!A',
    description: `password have to have min length of 6, 1 number, 1 lowercase, 1 uppercase, 1 number, 1 symbol. `,
  })
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @ApiProperty({
    enum: [Role.Admin, Role.User, Role.Company],
    example: Role.User,
    description: `Roles: Admin = 1, User = 2, Company = 3. 
    If the role is not informed, the role will be 2 - User by default. - It is not possible to register or change an 1 - Admin user via API, only directly in the database.`,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: number;

  @ApiProperty({
    example: '12345678901',
    description: `CPF is just used for display, it have to be UNIQUE.`,
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    example: '12345678901234',
    description: `CNPJ is just used for display, it have to be UNIQUE.`,
  })
  @IsOptional()
  @IsString()
  cnpj?: string;
}

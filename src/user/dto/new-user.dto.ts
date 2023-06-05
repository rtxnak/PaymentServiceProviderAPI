import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';
import { Role } from '../../enums/role.enum';

export class NewUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: number;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;
}

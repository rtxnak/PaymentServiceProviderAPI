import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({
    example: 'email@email.com',
    description: `valid email registered on the database`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456a!A',
    description: `valid password registered on the database`,
  })
  @IsString()
  @MinLength(6)
  password: string;
}

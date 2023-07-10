import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginReponseDTO {
  @ApiProperty({
    example: `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IlJhZmFlbCBOYWthc2hpbWEiLCJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInJvbGUiOjIsImlhdCI6MTY4ODY4MzE4MCwiZXhwIjoxNjg5Mjg3OTgwLCJhdWQiOiJ1c2VycyIsImlzcyI6ImxvZ2luIiwic3ViIjoiNCJ9.OmEvauk-OXC0Fx4OlIzgt_T8C7oJ5sjRvdsqO-g2VGQ"`,
    description: `JWT token generated with 7 days of expiration`,
  })
  @IsString()
  accessToken: string;
}

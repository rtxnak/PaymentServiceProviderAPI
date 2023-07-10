import { ApiProperty } from '@nestjs/swagger';

export class UpdateAndDeleteResponseDTO {
  @ApiProperty({
    example: true,
  })
  success: boolean;
}

import { ApiProperty } from '@nestjs/swagger';

export class PayableBalanceReponseDTO {
  @ApiProperty({
    example: {
      available: 0,
      waiting_funds: 950.52,
    },
    description: `"available" information is the sum of the amounts paid and "waiting_funds" is information on the amounts not yet paid`,
  })
  balance: {
    available: number;
    waiting_funds: number;
  };
}

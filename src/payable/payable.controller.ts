import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserEntity } from '../user/entity/user.entity';
import { UserInfo } from '../decorators/user-info.decorator';
import { PayableService } from './payable.service';
import { ApiBasicAuth, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { PayableBalanceReponseDTO } from './dto/payable-balance-response.dto';

@ApiTags('payable')
@ApiBasicAuth('defaultBearerAuth')
@Roles(Role.Admin, Role.Company)
@UseGuards(AuthGuard, RoleGuard)
@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get('details')
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  async listAllPayableDetailsFromCompany(@UserInfo() userInfo: UserEntity) {
    return this.payableService.listAllPayableDetailsFromCompany(userInfo);
  }

  @Get('balance')
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  async listPaidBalanceFromCompany(
    @UserInfo() userInfo: UserEntity,
  ): Promise<PayableBalanceReponseDTO> {
    return this.payableService.listBalanceFromCompany(userInfo);
  }
}

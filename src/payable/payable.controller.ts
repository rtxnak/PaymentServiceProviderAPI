import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserEntity } from '../user/entity/user.entity';
import { UserInfo } from '../decorators/user-info.decorator';
import { PayableService } from './payable.service';

@Roles(Role.Admin, Role.Company)
@UseGuards(AuthGuard, RoleGuard)
@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get('details')
  async listAllPayableDetailsFromCompany(@UserInfo() userInfo: UserEntity) {
    return this.payableService.listAllPayableDetailsFromCompany(userInfo);
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { NewTransactionDTO } from './dto/new-transaction.dto';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { UserInfo } from '../decorators/user-info.decorator';
import { UserEntity } from '../user/entity/user.entity';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('transaction')
@ApiBasicAuth('defaultBearerAuth')
@UseGuards(AuthGuard, RoleGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Roles(Role.Admin, Role.User, Role.Company)
  @Post()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  async create(
    @Body() data: NewTransactionDTO,
    @UserInfo() userInfo: UserEntity,
  ) {
    return this.transactionService.createNewTransaction(data, userInfo);
  }

  @Roles(Role.Admin, Role.User)
  @Get('customer')
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  async listAllTransactionsFromCustomer(@UserInfo() userInfo: UserEntity) {
    return this.transactionService.listAllTransactionsFromCustomer(userInfo);
  }

  @Roles(Role.Admin, Role.Company)
  @Get('company')
  @ApiForbiddenResponse({ description: 'Forbidden resource' })
  async listAllTransactionsFromCompany(@UserInfo() userInfo: UserEntity) {
    return this.transactionService.listAllTransactionsFromCompany(userInfo);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/entity/user.entity';
import { PayableService } from '../payable/payable.service';
import { PayableEntity } from '../payable/entity/payable.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, PayableEntity]),
    AuthModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, PayableService],
  exports: [TransactionModule],
})
export class TransactionModule {}

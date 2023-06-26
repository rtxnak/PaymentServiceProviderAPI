import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayableEntity } from './entity/payable.entity';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { AuthModule } from '../auth/auth.module';
import { TransactionEntity } from '../transaction/entity/transaction.entity';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity, PayableEntity]),
    AuthModule,
  ],
  controllers: [PayableController],
  providers: [PayableService],
  exports: [PayableModule],
})
export class PayableModule {}

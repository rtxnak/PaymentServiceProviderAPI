import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entity/transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, UserEntity]),
    AuthModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionModule],
})
export class TransactionModule {}

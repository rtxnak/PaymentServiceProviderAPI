import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayableEntity } from './entity/payable.entity';
import { PayableService } from './payable.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayableEntity])],
  controllers: [],
  providers: [PayableService],
  exports: [PayableModule],
})
export class PayableModule {}

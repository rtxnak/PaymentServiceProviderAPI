import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { userSeeds } from './user.seed';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    if (
      !(await this.entityManager.findOne(UserEntity, {
        where: {
          email: 'admin@email.com',
        },
      }))
    ) {
      await Promise.all([this.entityManager.save(UserEntity, userSeeds)]);
    }
  }
}

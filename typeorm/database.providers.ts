import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UserEntity } from '../src/user/entity/user.entity';
import { TransactionEntity } from '../src/transaction/entity/transaction.entity';
import { PayableEntity } from '../src/payable/entity/payable.entity';

dotenv.config({
  path: process.env.ENV === 'test' ? '.test.env' : '.env',
});

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity, TransactionEntity, PayableEntity],
  migrations: [`${__dirname}/migrations/**/*.ts`],
});

export default dataSource;

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrate1688078326398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'amount',
            type: 'decimal(6,2)',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '127',
          },
          {
            name: 'payment_method',
            type: 'enum',
            enum: ['debit_card', 'credit_card'],
          },
          {
            name: 'card_number',
            type: 'varchar',
            length: '4',
          },
          {
            name: 'card_owner_name',
            type: 'varchar',
            length: '127',
          },
          {
            name: 'card_exp_date',
            type: 'varchar',
          },
          {
            name: 'card_verification_code',
            type: 'varchar',
            length: '3',
          },
          {
            name: 'customer_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'company_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}

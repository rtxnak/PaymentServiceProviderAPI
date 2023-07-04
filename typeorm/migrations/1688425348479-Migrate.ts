import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Migrate1688425348479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payables',
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
            name: 'payment_date',
            type: 'datetime',
          },
          {
            name: 'fee_value',
            type: 'decimal(6,2)',
          },
          {
            name: 'payable_amount',
            type: 'decimal(6,2)',
          },
          {
            name: 'transaction_id',
            type: 'int',
            unsigned: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'payables',
      new TableForeignKey({
        columnNames: ['transaction_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transactions',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payables');
  }
}

import {
  MigrationInterface,
  QueryRunner,
  Table,
  // TableForeignKey,
} from 'typeorm';

export class Migrate1685565602048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'name',
            type: 'varchar',
            length: '63',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '127',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '127',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'int',
            default: '2',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '11',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '14',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1680019677067 implements MigrationInterface {
  private tableName = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'first_name',
            type: 'varchar',
            isNullable: false,
            length: '45',
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: false,
            length: '45',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '60',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        uniques: [
          {
            columnNames: ['email'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}


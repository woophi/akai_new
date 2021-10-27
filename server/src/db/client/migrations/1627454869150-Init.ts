import { readMigration } from 'nest-utils';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { dbAppPath } from './constants';

export class Init1627454869150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(readMigration('1_init', dbAppPath));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

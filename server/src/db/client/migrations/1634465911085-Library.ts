import { readMigration } from 'nest-utils';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { dbAppPath } from './constants';

export class Library1634465911085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(readMigration('2_lib', dbAppPath));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

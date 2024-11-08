import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDelete1731096424903 implements MigrationInterface {
    name = 'AddDelete1731096424903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    }

}

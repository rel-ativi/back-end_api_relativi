import { MigrationInterface, QueryRunner } from "typeorm";

export class entityUpdades1663103118077 implements MigrationInterface {
    name = 'entityUpdades1663103118077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_deb91524d6e1a7d6f66e4a8840c"`);
        await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "paymentInfoIdId" TO "paymentInfoId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "createdById" uuid`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_62d93f5f84d128f1fe834f077e2" FOREIGN KEY ("createdById") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_62d93f5f84d128f1fe834f077e2"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "profiles" RENAME COLUMN "paymentInfoId" TO "paymentInfoIdId"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_deb91524d6e1a7d6f66e4a8840c" FOREIGN KEY ("paymentInfoIdId") REFERENCES "payment_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

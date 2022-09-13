import { MigrationInterface, QueryRunner } from "typeorm";

export class entityUpdades1663110868220 implements MigrationInterface {
    name = 'entityUpdades1663110868220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ade582ccdd65522e01f22e29a32"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5803aa050358a4d5619c270a093"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ade582ccdd65522e01f22e29a32" FOREIGN KEY ("bankInfoId") REFERENCES "bank_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5803aa050358a4d5619c270a093" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5803aa050358a4d5619c270a093"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ade582ccdd65522e01f22e29a32"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942"`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5803aa050358a4d5619c270a093" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ade582ccdd65522e01f22e29a32" FOREIGN KEY ("bankInfoId") REFERENCES "bank_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

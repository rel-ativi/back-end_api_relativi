import { MigrationInterface, QueryRunner } from "typeorm";

export class entityUpdates1663132369163 implements MigrationInterface {
    name = 'entityUpdates1663132369163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5803aa050358a4d5619c270a093"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180"`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5803aa050358a4d5619c270a093" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180"`);
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_5803aa050358a4d5619c270a093"`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_0e2bc0e1180cce4963c1274c180" FOREIGN KEY ("activityScheduleId") REFERENCES "activity_schedule"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_5803aa050358a4d5619c270a093" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class entityUpdates1663132837371 implements MigrationInterface {
    name = 'entityUpdates1663132837371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ade582ccdd65522e01f22e29a32"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_f975b3c53730463bc607d23bf8b"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_221420cb636d4e9e48aeca528a0"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_debce902ec6af918010a7b04264"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_589483c676701aa3bbb2695daf2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ade582ccdd65522e01f22e29a32" FOREIGN KEY ("bankInfoId") REFERENCES "bank_info"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_f975b3c53730463bc607d23bf8b" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_221420cb636d4e9e48aeca528a0" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_debce902ec6af918010a7b04264" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_589483c676701aa3bbb2695daf2" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_589483c676701aa3bbb2695daf2"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_debce902ec6af918010a7b04264"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_221420cb636d4e9e48aeca528a0"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_f975b3c53730463bc607d23bf8b"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ade582ccdd65522e01f22e29a32"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_589483c676701aa3bbb2695daf2" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_debce902ec6af918010a7b04264" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_221420cb636d4e9e48aeca528a0" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_f975b3c53730463bc607d23bf8b" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ade582ccdd65522e01f22e29a32" FOREIGN KEY ("bankInfoId") REFERENCES "bank_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

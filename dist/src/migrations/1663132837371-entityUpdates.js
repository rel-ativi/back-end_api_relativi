"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityUpdates1663132837371 = void 0;
class entityUpdates1663132837371 {
    constructor() {
        this.name = 'entityUpdates1663132837371';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942"`);
            yield queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ade582ccdd65522e01f22e29a32"`);
            yield queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_f975b3c53730463bc607d23bf8b"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_221420cb636d4e9e48aeca528a0"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_debce902ec6af918010a7b04264"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_589483c676701aa3bbb2695daf2"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
            yield queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ade582ccdd65522e01f22e29a32" FOREIGN KEY ("bankInfoId") REFERENCES "bank_info"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_f975b3c53730463bc607d23bf8b" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_221420cb636d4e9e48aeca528a0" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_debce902ec6af918010a7b04264" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_589483c676701aa3bbb2695daf2" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_589483c676701aa3bbb2695daf2"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_debce902ec6af918010a7b04264"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_221420cb636d4e9e48aeca528a0"`);
            yield queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_f975b3c53730463bc607d23bf8b"`);
            yield queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906"`);
            yield queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ade582ccdd65522e01f22e29a32"`);
            yield queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_589483c676701aa3bbb2695daf2" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_debce902ec6af918010a7b04264" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_221420cb636d4e9e48aeca528a0" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_f975b3c53730463bc607d23bf8b" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_35c26e5d9b58c32bdfbb660d906" FOREIGN KEY ("paymentInfoId") REFERENCES "payment_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ade582ccdd65522e01f22e29a32" FOREIGN KEY ("bankInfoId") REFERENCES "bank_info"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_33e2671fc5a4f3bc5ba6a8b3942" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
}
exports.entityUpdates1663132837371 = entityUpdates1663132837371;
